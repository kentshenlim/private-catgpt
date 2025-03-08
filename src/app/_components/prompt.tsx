import { SendHorizontal } from "lucide-react";

export default function Prompt() {
  return (
    <form
      action=""
      className="flex flex-col rounded-2xl bg-primary py-2 [&>textarea]:bg-primary"
    >
      <textarea
        name="prompt"
        id="prompt"
        placeholder="Ask anything"
        className="bg-test/[50%] placeholder-text/50 resize-none px-3 py-1 focus:outline-none"
        rows={2}
      />
      <button
        type="submit"
        className="hover:bg-accent/70 self-end rounded-full bg-accent p-2 text-sm text-background"
      >
        <SendHorizontal strokeWidth={2} size={20} />
      </button>
    </form>
  );
}
