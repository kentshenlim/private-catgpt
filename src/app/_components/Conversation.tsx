"use client";

import { type RefObject, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atelierDuneDark,
  kimbieLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

import AnimatedCat from "@/app/_components/AnimatedCat";
import { useConversation } from "@/app/_states/ConversationProvider";
import { useTheme } from "@/app/_states/ThemeProvider";

export default function Conversation() {
  const { conversation, isSystemThinking } = useConversation();
  const lastUserMessageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    lastUserMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [conversation]);

  const lastUserMessageIdx = conversation
    .map((message) => message.role)
    .lastIndexOf("user");

  return !conversation.length ? (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <AnimatedCat isSpinning={false} size={120} />
      <h1 className="w-3/4 text-center text-3xl font-semibold">
        What can meow help you with today?
      </h1>
    </div>
  ) : (
    <div className="flex w-full flex-col gap-y-8 overflow-y-auto px-10 pb-8 pt-4 text-base/7 [&_li]:my-2 [&_ol]:my-2 [&_p]:mb-2 [&_pre]:my-4 [&_pre]:overflow-y-auto [&_ul]:my-2">
      {conversation.map((message, idx) =>
        message.role === "system" ? (
          <SystemResponse key={idx}>{message.content}</SystemResponse>
        ) : (
          <UserResponse
            key={idx}
            ref={idx === lastUserMessageIdx ? lastUserMessageRef : undefined}
          >
            {message.content}
          </UserResponse>
        ),
      )}
      {isSystemThinking && (
        <article>
          <AnimatedCat />
        </article>
      )}
    </div>
  );
}

function SystemResponse({ children }: { children: string }) {
  const { isDarkTheme } = useTheme();
  return (
    <article>
      <AnimatedCat isSpinning={false} />
      <Markdown
        components={{
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className ?? "");
            return match ? (
              <SyntaxHighlighter
                PreTag="div"
                language={match[1]}
                style={isDarkTheme ? atelierDuneDark : kimbieLight}
              >
                {/*eslint-disable-next-line @typescript-eslint/no-base-to-string*/}
                {String(children)}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {children}
      </Markdown>
    </article>
  );
}

function UserResponse({
  children,
  ref,
}: {
  children: string;
  ref?: RefObject<HTMLElement>;
}) {
  return (
    <article
      className="max-w-[40ch] self-end whitespace-pre-wrap rounded-xl rounded-br-3xl rounded-tr-md bg-primary px-4 py-3"
      ref={ref}
    >
      {children}
    </article>
  );
}
