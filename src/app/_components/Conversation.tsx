"use client";

import { useConversation } from "./ConversationProvider";
import Markdown from "react-markdown";
import { AnimatedCat } from "@/lib/ui";
import { useRef, useEffect } from "react";

export default function Conversation() {
  const { conversation, isSystemThinking } = useConversation();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversation[conversation.length - 1]?.role === "user")
      scrollerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <div className="flex flex-col gap-y-8 px-6 pb-12 pt-4 text-base/7 [&_li]:my-2 [&_ol]:my-2 [&_ul]:my-2">
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
