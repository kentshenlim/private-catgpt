import { PanelsTopLeft, PenLine } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between py-2 text-accent">
      <button>
        <PanelsTopLeft strokeWidth={2.5} />
      </button>
      <h1 className="text-xl font-semibold">CatGPT</h1>
      <button>
        <PenLine />
      </button>
    </div>
  );
}
