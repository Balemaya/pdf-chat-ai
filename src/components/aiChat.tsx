"use client";

import { scrollToBottom, getSources } from "@/lib/utils";
import { ChatLine } from "./chat-line";
import { useChat, Message } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useEffect, useRef, useState } from "react";
import { ChatGPTAgent } from "@/types";
import { api } from "@/app/api/_trpc/client";

export function Chat({ id }: { id: string }) {
  interface ExtendedMsg extends Message {
    sources?: string[];
  }
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [extendedMessages, setExtendedMessages]=useState<ExtendedMsg[]>([])
  const { data: savedMessages, isSuccess } =
    api.messages.getDocumentMessages.useQuery({ id });
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      initialMessages: savedMessages,
      body: { id },
      onFinish: (message) => {
        const newSources=(data[data?.length-1]?.sources) as string[]
    const newMessage={...message, sources: newSources}
      setExtendedMessages(prev=> [...prev, newMessage])
      },
    });
    console.log( data)
    console.log(messages)
  const sources = (role: ChatGPTAgent, index: number) =>
    getSources(data, role, index);
  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  const { mutate: saveMessage } = api.messages.create.useMutation();

  const extendedHnadleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    input: string
  ) => {
    handleSubmit(e);
    saveMessage({ role: "user", content: input, documentId: id });
  };
  return (
    <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto" ref={containerRef}>
        {extendedMessages.map(({ id, role, content, sources }: ExtendedMsg) => (
          <ChatLine
            key={id}
            role={role}
            content={content}
            // Start from the third message of the assistant
            sources={sources}
          />
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 flex clear-both"
      >
        <Input
          value={input}
          placeholder={"Type to chat with AI..."}
          onChange={handleInputChange}
          className="mr-2"
        />

        <Button type="submit" className="w-24">
          {isLoading ? <Spinner /> : "Ask"}
        </Button>
      </form>
    </div>
  );
}