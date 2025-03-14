"use client";

import frFlag from "@/app/assets/fr-flag.png";
import jpnFlag from "@/app/assets/jpn-flag.png";
import parrot from "@/app/assets/parrot.png";
import spFlag from "@/app/assets/sp-flag.png";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";
import { Message, translate } from "./actions";

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("fr");
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages]);

  const buttons = [
    {
      src: frFlag,
      name: "fr",
    },
    {
      src: spFlag,
      name: "sp",
    },
    {
      src: jpnFlag,
      name: "jpn",
    },
  ];

  const handleSendMessage = async (message: string) => {
    if (message.trim() === "") return;

    setIsTranslating(true);

    try {
      setMessages([...messages, { role: "user", content: message }]);
      const translatedMessage = await translate(
        message,
        selectedLanguage,
        messages
      );
      setMessages([
        ...messages,
        { role: "user", content: message },
        { role: "assistant", content: translatedMessage || "" },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="mx-auto max-w-[390]">
      <header className="bg-[url('@/app/assets/worldmap.png')] text-background flex items-center gap-4 h-53 px-10">
        <Image src={parrot} alt="parrot" className="h-21 w-auto" />
        <div>
          <h1 className="text-green-500 font-(family-name:--font-big-shoulders-display) text-[43px] font-extrabold">
            PollyGlot
          </h1>
          <p className="font-(family-name:var(--font-poppins)) text-xs font-semibold">
            Perfect translation Every Time
          </p>
        </div>
      </header>

      <div className="h-[568px] bg-background px-[14px] py-[32px] ">
        <div className="border-3 border-foreground rounded-xl w-full h-full flex flex-col gap-4 px-4 py-6">
          <div
            ref={messagesContainerRef}
            className="border border-foreground/20 rounded flex-1 overflow-y-scroll no-scrollbar p-4 flex flex-col gap-2"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-2 max-w-4/5 rounded-lg self-end",
                  message.role === "user"
                    ? "self-end bg-green-400"
                    : "self-start bg-gray-200"
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className="relative">
            <textarea
              value={inputMessage}
              className="border border-foreground/20 rounded w-full h-auto resize-none p-2 pr-10 min-h-[46px] max-h-[86px] overflow-y-auto no-scrollbar font-[family-name:var(--font-poppins)] font-bold text-xl"
              rows={1}
              onChange={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
                setInputMessage(e.target.value);
              }}
            />
            <button
              className="absolute bottom-[13px] right-1 hover:bg-foreground/20 p-1 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
              disabled={isTranslating}
              onClick={() => {
                handleSendMessage(inputMessage);
                setInputMessage("");
              }}
            >
              <VscSend className="w-6 h-6" />
            </button>
          </div>
          <div className="flex justify-around">
            {buttons.map((button) => (
              <button
                key={button.name}
                className={cn(
                  "outline-3 outline-transparent hover:outline-blue-900/60",
                  selectedLanguage === button.name
                    ? "outline-blue-900 hover:outline-blue-900"
                    : ""
                )}
                onClick={() => setSelectedLanguage(button.name)}
              >
                <Image
                  src={button.src}
                  alt={button.name}
                  className="h-8 w-auto object-cover border"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
