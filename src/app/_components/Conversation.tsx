"use client";

import { useConversation } from "@/app/_components/ConversationProvider";
import Markdown from "react-markdown";
import AnimatedCat from "@/lib/ui/AnimatedCat";
import { useRef, useEffect } from "react";

export default function Conversation() {
  const { conversation, isSystemThinking } = useConversation();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversation[conversation.length - 1]?.role === "user")
      scrollerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return !conversation.length ? (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <AnimatedCat isSpinning={false} size={120} />
      <h1 className="w-3/4 text-center text-3xl font-semibold">
        What can meow help with?
      </h1>
    </div>
  ) : (
    <div className="flex w-full flex-col gap-y-8 overflow-y-auto px-10 pb-8 pt-4 text-base/7 [&_li]:my-2 [&_ol]:my-2 [&_p]:mb-3 [&_ul]:my-2">
      {conversation.map((message, idx) =>
        message.role === "system" ? (
          <SystemResponse key={idx}>{message.content}</SystemResponse>
        ) : (
          <UserResponse key={idx}>{message.content}</UserResponse>
        ),
      )}
      {isSystemThinking && (
        <article>
          <AnimatedCat />
        </article>
      )}
      <div ref={scrollerRef}></div>
    </div>
  );
}

function SystemResponse({ children }: { children: string }) {
  return (
    <article>
      <AnimatedCat isSpinning={false} />
      <Markdown>{children}</Markdown>
    </article>
  );
}

function UserResponse({ children }: { children: string }) {
  return (
    <article className="max-w-[40ch] self-end rounded-xl rounded-br-3xl rounded-tr-md bg-primary px-4 py-3">
      {children}
    </article>
  );
}
