"use server";

import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAI } from "openai";
import path from "path";

const chatMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
  {
    role: "system" as const,
    content: `You are an enthusiastic movie expert who loves recommending movies to people. You will be given two pieces of information - some context about movies and a question. Your main job is to formulate a short answer to the question using the provided context. If you are unsure and cannot find the answer in the context, say, "Sorry, I don't know the answer." Please do not make up the answer.`,
  },
];

export async function splitDocument() {
  const filePath = path.join(process.cwd(), "app/assets/movies.txt");
  const text = await fs.readFile(filePath, "utf8");

  const splitter = new CharacterTextSplitter({
    separator: " ",
    chunkSize: 150,
    chunkOverlap: 15,
  });

  return await splitter.splitText(text);
}

export async function createEmbedding(input: string | string[]) {
  const openai = new OpenAI({
    baseURL: process.env.EMBEDING_BASE_URL,
    apiKey: process.env.EMBEDDING_API_KEY,
  });

  const embeddings = await openai.embeddings.create({
    model: process.env.EMBEDDING_MODEL!,
    input: input,
  });
  // console.log(embeddings);

  return embeddings.data.map((embedding, index) => ({
    content: input instanceof Array ? input[index] : input,
    embedding: embedding.embedding,
  }));
}

export async function createAndStoreEmbeddings() {
  const chunks = await splitDocument();

  const embeddings = await createEmbedding(chunks);
  console.log(embeddings);

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const deleteResp = await supabase.from("documents").delete().neq("id", -1);
  // console.log(deleteResp);

  const insertResp = await supabase.from("documents").insert(embeddings);
  // console.log(insertResp);
}

export async function findSimilarMovies(query: string) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const queryEmbedding = await createEmbedding(query);
  // console.log(queryEmbedding);

  const rpcResp = await supabase.rpc("match_documents", {
    query_embedding: queryEmbedding[0].embedding,
    match_threshold: 0.3,
    match_count: 4,
  });
  // console.log(rpcResp);

  return rpcResp.data.map((movie: any) => movie.content).join(" ");
}

export async function getChatCompletion(input: string) {
  const text = await findSimilarMovies(input);
  // console.log("text piece:", text);

  chatMessages.push({
    role: "user" as const,
    content: `Context: ${text} Question: ${input}`,
  });

  const openai = new OpenAI({
    baseURL: process.env.COMPLETIONS_BASE_URL,
    apiKey: process.env.COMPLETIONS_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: process.env.COMPLETIONS_MODEL!,
    messages: chatMessages,
    temperature: 0.5,
    frequency_penalty: 0.5,
  });
  console.log(response.choices[0].message.content);
}
