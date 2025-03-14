"use client";

import { useEffect } from "react";
import { getChatCompletion } from "./actions";

export default function Home() {
  useEffect(() => {
    // createAndStoreEmbeddings();
    // findSimilarMovies("The Dark Knight");
    getChatCompletion("Which movie will give me an adrenaline rush?");
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
