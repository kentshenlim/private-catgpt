import CatPawNormal from "@/lib/ui/CatPawNormal";
import CatPawSharp from "@/lib/ui/CatPawSharp";
import CatPawRound from "@/lib/ui/CatPawRound";
import CatPawLines from "@/lib/ui/CatPawLines";

export default function Layout({ children }: { children: React.ReactNode }) {
  const size = 200;
  return (
    <>
      {children}
      <div className="absolute top-0 hidden rotate-45 sm:block md:scale-150 lg:scale-[200%]">
        <CatPawNormal size={size} />
      </div>
      <div className="absolute bottom-0 right-0 hidden -rotate-45 sm:block">
        <CatPawSharp size={size} />
      </div>
      <div className="absolute bottom-0 right-0 hidden -rotate-45 sm:block lg:scale-125">
        <CatPawSharp size={size} />
      </div>
      <div className="absolute bottom-[5%] left-[10%] hidden rotate-[15deg] lg:block lg:scale-150">
        <CatPawRound size={size} />
      </div>
      <div className="absolute bottom-1/2 right-[10%] hidden -rotate-[37deg] scale-150 xl:block">
        <CatPawLines size={size} />
      </div>
    </>
  );
}
