import AnimatedCat from "@/app/_components/AnimatedCat";

export default function Header() {
  return (
    <header className="flex flex-col items-center">
      <AnimatedCat once={true} size={50} />
      <h1 className="text-2xl font-semibold text-accent">CatGPT</h1>
    </header>
  );
}
