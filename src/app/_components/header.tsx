import { PanelsTopLeft, PenLine } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between px-4 py-2 text-accent">
      <button>
        <PanelsTopLeft strokeWidth={2.5} />
      </button>
      <h1 className="text-xl font-semibold">CatGPT</h1>
      <button>
        <PenLine />
      </button>
    </header>
  );
}
