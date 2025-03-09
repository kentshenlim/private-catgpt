"use client";

import { SendHorizontal } from "lucide-react";
import { useConversation } from "./ConversationProvider";
import { type FormEvent } from "react";
import { useState } from "react";
import { api } from "@/trpc/react";

export default function Prompt() {
  const { appendMessage, conversation, isSystemThinking, setIsSystemThinking } =
    useConversation();
  const [userMessage, setUserMessage] = useState("");
  const sendMessage = api.openAI.chatCompletionPrompt.useMutation(); // client - tRPC

  function handleSubmit(e: FormEvent) {
    // handleSubmit mutate state multiple times, so must use callback in addConversation
    e.preventDefault();
    appendMessage({ role: "user", content: userMessage });
    setUserMessage("");
    setIsSystemThinking(true);
    sendMessage.mutate(
      [...conversation, { role: "user", content: userMessage }],
      {
        onSuccess: (response) => {
          appendMessage(response);
        },
        onSettled() {
          setIsSystemThinking(false);
        },
      },
    );
  }

  return (
    <form
      className="flex flex-col rounded-2xl bg-primary py-2 [&>textarea]:bg-primary"
      onSubmit={handleSubmit}
    >
      <textarea
        name="prompt"
        id="prompt"
        placeholder="Ask anything"
        className="bg-test/[50%] resize-none px-3 py-1 placeholder-text/50 focus:outline-none"
        rows={2}
        onChange={(e) => {
          setUserMessage(e.target.value);
        }}
        value={userMessage}
      />
      <button
        type="submit"
        className="self-end rounded-full bg-accent p-2 text-sm text-background hover:bg-accent/70 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={isSystemThinking}
      >
        <SendHorizontal strokeWidth={2} size={20} />
      </button>
    </form>
  );
}
