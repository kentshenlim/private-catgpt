"use client";

import { Pause, SendHorizontal } from "lucide-react";
import {
  type ButtonHTMLAttributes,
  type FormEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from "react";

import { useConversation } from "@/app/_states/ConversationProvider";
import { type Message } from "@/lib/schema";
import { api } from "@/trpc/react";

export default function Prompt() {
  const { appendMessage, conversation, isSystemThinking, setIsSystemThinking } =
    useConversation();
  const [userMessage, setUserMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const cancelRequest = useRef<(() => void) | null>(null);
  const sendMessage = api.openAI.chatCompletionPrompt.useMutation(); // client - tRPC

  async function handleSubmit(e: FormEvent) {
    // handleSubmit mutate state multiple times, so must use callback in addConversation
    e.preventDefault();
    appendMessage({ role: "user", content: userMessage });
    setUserMessage("");
    setIsSystemThinking(true);
    const cancelPromise = new Promise<Message>((resolve, _) => {
      cancelRequest.current = () =>
        resolve({
          role: "system",
          content: "🐾 Request scratched!",
        });
    });
    Promise.race([
      sendMessage.mutateAsync([
        ...conversation,
        { role: "user", content: userMessage },
      ]),
      cancelPromise,
    ])
      .then((res) => {
        appendMessage(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSystemThinking(false);
      });
  }

  function handleCancel() {
    if (cancelRequest.current) cancelRequest.current();
  }

  function handleEnterPress(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = formRef.current;
      if (form && !isSystemThinking)
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
      {isSystemThinking ? (
        <RoundButton type="button" onClick={handleCancel}>
          <Pause strokeWidth={2} size={20} />
        </RoundButton>
      ) : (
        <RoundButton type="submit" disabled={userMessage.length === 0}>
          <SendHorizontal strokeWidth={2} size={20} />
        </RoundButton>
      )}
    </form>
  );
}

function RoundButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="mr-1 self-end rounded-full bg-accent p-2 text-sm text-background hover:bg-accent/70 disabled:cursor-not-allowed disabled:opacity-40"
      {...props}
    >
      {props.children}
    </button>
  );
}
