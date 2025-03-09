import { PanelsTopLeft, PenLine, PawPrint } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between py-2 text-accent">
      <button>
        <PanelsTopLeft strokeWidth={2.5} />
      </button>
      <div className="flex gap-1">
        <PawPrint />
        <h1 className="text-xl font-semibold">CatGPT</h1>
      </div>
      <button>
        <PenLine />
      </button>
    </div>
  );
}
