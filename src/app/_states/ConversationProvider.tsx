"use client";
import { createContext, useContext, useState } from "react";
import { type Message } from "@/lib/schema";
import { shortFakeConversation } from "@/lib/utils/fake-conversation";

const ConversationContext = createContext<{
  conversation: Message[];
  appendMessage: (message: Message) => void;
  clearConversation: () => void;
  isSystemThinking: boolean;
  setIsSystemThinking: (isThinking: boolean) => void;
}>({
  conversation: [],
  appendMessage(message: Message) {
    console.log(`Adding message: ${message.content}, by ${message.role}`);
  },
  clearConversation() {
    console.log("Clearing conversation");
  },
  isSystemThinking: false,
  setIsSystemThinking(isThinking) {
    console.log(`System is ${isThinking ? "" : "not"} thinking now.`);
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
  const [isSystemThinking, setIsSystemThinking] = useState<boolean>(false);

  function appendMessage(message: Message) {
    setConversation((conversation) => [...conversation, message]); // Must use callback here, because Prompt mutate state multiple times within one event handler
  }

  function clearConversation() {
    setConversation(() => []);
  }

  return (
    <ConversationContext.Provider
      value={{
        conversation,
        appendMessage,
        clearConversation,
        isSystemThinking,
        setIsSystemThinking,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  return useContext(ConversationContext);
}
