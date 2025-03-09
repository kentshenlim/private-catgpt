"use client";
import { useConversation } from "./ConversationProvider";

export default function Conversation() {
  const { conversation, addConversation, clearConversation } =
    useConversation();

  return (
    <div className="flex flex-col gap-y-8 pb-12 pt-4">
      {conversation.map((message, idx) =>
        message.role === "system" ? (
          <SystemResponse key={idx}>{message.content}</SystemResponse>
        ) : (
          <UserResponse key={idx}>{message.content}</UserResponse>
        ),
      )}
    </div>
  );
}

function SystemResponse({ children }: { children: string }) {
  return <article>{children}</article>;
}

function UserResponse({ children }: { children: string }) {
  return (
    <article className="max-w-[40ch] self-end rounded-2xl bg-primary px-5 py-3">
      {children}
    </article>
  );
}
