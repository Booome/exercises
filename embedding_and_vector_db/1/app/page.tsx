"use client";

import { Button } from "@/components/ui/button";
import { injectData, test } from "./actions";

export default function Home() {
  return (
    <div className="flex flex-row gap-4 [&>button]:bg-blue-500 [&>button]:text-white [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-md">
      <Button onClick={injectData}>Inject Data</Button>
      <Button onClick={test}>Test</Button>
    </div>
  );
}
