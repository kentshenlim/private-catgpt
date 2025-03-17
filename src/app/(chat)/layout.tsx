import CatPawLines from "@/lib/ui/CatPawLines";
import CatSmile from "@/lib/ui/CatSmile";

export default function Layout({ children }: { children: React.ReactNode }) {
  const size = 200;
  return (
    <>
      {children}
      <div className="absolute left-0 top-1/3 hidden -rotate-45 lg:block xl:scale-125">
        <CatSmile size={size} />
      </div>
      <div className="rotate-15 absolute bottom-32 right-[3%] hidden scale-125 xl:block">
        <CatPawLines size={size} />
      </div>
    </>
  );
}
