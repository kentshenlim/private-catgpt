"use client";

import { SendHorizontal } from "lucide-react";
import { useConversation } from "./ConversationProvider";
import { type KeyboardEvent, type FormEvent } from "react";
import { useState, useRef } from "react";
import { api } from "@/trpc/react";

export default function Prompt() {
  const { appendMessage, conversation, isSystemThinking, setIsSystemThinking } =
    useConversation();
  const [userMessage, setUserMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
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

  function handleEnterPress(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = formRef.current;
      if (form)
        form.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }),
        );
    }
  }

  return (
    <form
      className="flex flex-col rounded-2xl bg-primary py-2 [&>textarea]:bg-primary"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <textarea
        name="prompt"
        id="prompt"
        placeholder="Ask anything"
        className="bg-test/[50%] mx-2 resize-none px-3 py-1 placeholder-text/50 focus:outline-none"
        rows={2}
        onChange={(e) => {
          setUserMessage(e.target.value);
        }}
        value={userMessage}
        onKeyDown={handleEnterPress}
      />
      <button
        type="submit"
        className="self-end rounded-full bg-accent p-2 text-sm text-background hover:bg-accent/70 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={isSystemThinking || userMessage.length === 0}
      >
        <SendHorizontal strokeWidth={2} size={20} />
      </button>
    </form>
  );
}
