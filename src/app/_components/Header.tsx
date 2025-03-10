import { PenLine, PawPrint } from "lucide-react";
import ThemeToggler from "@/lib/ui/ThemeToggler";

export default function Header() {
  return (
    <div className="flex justify-between py-2 text-accent">
      <ThemeToggler />
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
