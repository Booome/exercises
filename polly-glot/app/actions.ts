"use server";

import OpenAI from "openai";

type Role = "system" | "user" | "assistant";

export type Message = {
  role: Role;
  content: string;
};

export async function translate(
  text: string,
  language: string,
  history: Message[]
) {
  const openai = new OpenAI({
    baseURL: process.env.OPENAI_BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a translator. You are given a text and a language. You need to translate the text to the given language. Don't add any other text to the response, double quotes around the response is not needed.",
      },
      ...history,
      {
        role: "user",
        content: JSON.stringify({
          language,
          text,
        }),
      },
    ],
    stream: false,
  });

  const content = response.choices[0].message.content;

  return content;
}
