"use client";

import { SquarePen } from "lucide-react";
import { useConversation } from "@/app/_components/ConversationProvider";

export default function ResetButton() {
  const { clearConversation, setIsSystemThinking } = useConversation();

  function handleClick() {
    clearConversation();
    setIsSystemThinking(false);
  }

  return (
    <button onClick={handleClick}>
      <SquarePen />
    </button>
  );
}
