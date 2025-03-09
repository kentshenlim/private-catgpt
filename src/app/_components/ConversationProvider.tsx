"use client";
import { createContext, useContext, useState } from "react";
import { type Message } from "@/lib/schema";
import { fakeConversation } from "@/lib/fake-conversation";

const ConversationContext = createContext<{
  conversation: Message[];
  addConversation: (message: Message) => void;
  clearConversation: () => void;
}>({
  conversation: [],
  addConversation(message: Message) {
    console.log(`Adding message: ${message.content}, by ${message.role}`);
  },
  clearConversation() {
    console.log("Clearing conversation");
  },
});

export function ConversationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [conversation, setConversation] = useState<Message[]>(fakeConversation);

  function addConversation(message: Message) {
    setConversation([...conversation, message]);
  }

  function clearConversation() {
    setConversation([]);
  }

  return (
    <ConversationContext.Provider
      value={{ conversation, addConversation, clearConversation }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  return useContext(ConversationContext);
}
