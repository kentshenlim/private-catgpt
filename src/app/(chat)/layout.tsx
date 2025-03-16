import CatPawLines from "@/lib/ui/CatPawLines";
import CatSmile from "@/lib/ui/CatSmile";

export default function Layout({ children }: { children: React.ReactNode }) {
  const size = 200;
  return (
    <>
      {children}
      <div className="absolute right-0 top-1/2 hidden -rotate-45 lg:block xl:scale-125">
        <CatPawLines size={size} />
      </div>
      <div className="absolute left-0 top-1/3 hidden -rotate-45 lg:block xl:scale-125">
        <CatSmile size={size} />
      </div>
    </>
  );
}
