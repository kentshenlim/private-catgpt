"use client";

import { SquarePen } from "lucide-react";

import { useConversation } from "@/app/_states/ConversationProvider";

export default function ResetButton() {
  const { clearConversation, isSystemThinking } = useConversation();

  return (
    <button
      onClick={clearConversation}
      disabled={isSystemThinking}
      className="disabled:cursor-not-allowed"
    >
      <SquarePen />
    </button>
  );
}
