"use server";

import { createClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";

const model = "nomic-ai/nomic-embed-text-v1";

const chatMessages = [
  {
    role: "system" as const,
    content: `You are an enthusiastic podcast expert who loves recommending podcasts to people. You will be given two pieces of information - some context about podcasts episodes and a question. Your main job is to formulate a short answer to the question using the provided context. If you are unsure and cannot find the answer in the context, say, "Sorry, I don't know the answer." Please do not make up the answer.`,
  },
];

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

async function createEmbedding(input: string | string[]) {
  const openai = new OpenAI({
    baseURL: process.env.EMBEDING_BASE_URL,
    apiKey: process.env.EMBEDING_API_KEY,
  });

  const response = await openai.embeddings.create({
    model: process.env.EMBEDING_MODEL!,
    input,
  });

  return response.data;
}

async function findNearestMatch(embedding: number[]) {
  const rpcResponse = await supabase.rpc("match_documents", {
    query_embedding: embedding,
    match_threshold: 0.5,
    match_count: 1,
  });

  return rpcResponse.data[0].content;
}

async function createChatCompletions(text: string, query: string) {
  const openai = new OpenAI({
    baseURL: process.env.COMPLETIONS_BASE_URL,
    apiKey: process.env.COMPLETIONS_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: process.env.COMPLETIONS_MODEL!,
    messages: [
      ...chatMessages,
      {
        role: "user" as const,
        content: JSON.stringify({
          text,
          query,
        }),
      },
    ],
  });

  return response.choices[0].message.content;
}

export async function injectData() {
  const content = [
    "Beyond Mars (1 hr 15 min): Join space enthusiasts as they speculate about extraterrestrial life and the mysteries of distant planets.",
    "Jazz under stars (55 min): Experience a captivating night in New Orleans, where jazz melodies echo under the moonlit sky.",
    "Mysteries of the deep (1 hr 30 min): Dive with marine explorers into the uncharted caves of our oceans and uncover their hidden wonders.",
    "Rediscovering lost melodies (48 min): Journey through time to explore the resurgence of vinyl culture and its timeless appeal.",
    "Tales from the tech frontier (1 hr 5 min): Navigate the complex terrain of AI ethics, understanding its implications and challenges.",
    "The soundscape of silence (30 min): Traverse the globe with sonic explorers to find the world's most serene and silent spots.",
    "Decoding dreams (1 hr 22 min): Step into the realm of the subconscious, deciphering the intricate narratives woven by our dreams.",
    "Time capsules (50 min): Revel in the bizarre, endearing, and profound discoveries that unveil the quirks of a century past.",
    "Frozen in time (1 hr 40 min): Embark on an icy expedition, unearthing secrets hidden within the majestic ancient glaciers.",
    "Songs of the Sea (1 hr): Dive deep with marine biologists to understand the intricate whale songs echoing in our vast oceans.",
  ];

  const embeddings = (await createEmbedding(content)).map((d) => {
    return {
      embedding: d.embedding,
      content: content[d.index],
    };
  });
  console.log(embeddings);

  const truncateResponse = await supabase
    .from("documents")
    .delete()
    .neq("id", 0);
  console.log("truncateResponse:", truncateResponse);

  const insertResponse = await supabase.from("documents").insert(embeddings);
  console.log("insertResponse:", insertResponse);
}

export async function test() {
  const query = "Something peaceful and relaxing";

  const embeddingResponse = await createEmbedding(query);
  const embedding = embeddingResponse[0].embedding;

  const matching = await findNearestMatch(embedding);
  console.log("matching:", matching);

  const completion = await createChatCompletions(matching, query);
  console.log("completion:", completion);
}
