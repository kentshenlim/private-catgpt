"use client";
import { createContext, useContext, useState } from "react";
import { type Message } from "@/lib/schema";
import { shortFakeConversation } from "@/lib/fake-conversation";

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
  const [conversation, setConversation] = useState<Message[]>(
    shortFakeConversation,
  );

  function addConversation(message: Message) {
    setConversation((conversation) => [...conversation, message]); // Must use callback here, because Prompt mutate state twice within one event handler
  }

  function clearConversation() {
    setConversation(() => []);
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
