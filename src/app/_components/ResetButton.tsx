"use client";

import { Trash2 } from "lucide-react";

import { useConversation } from "@/app/_states/ConversationProvider";

export default function ResetButton() {
  const { clearConversation, isSystemThinking } = useConversation();

  return (
    <button
      onClick={clearConversation}
      disabled={isSystemThinking}
      className="disabled:cursor-not-allowed"
    >
      <Trash2 strokeWidth={2.4} />
    </button>
  );
}
