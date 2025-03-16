import CatPawNormal from "@/lib/ui/CatPawNormal";
import CatPawSharp from "@/lib/ui/CatPawSharp";
import CatTail from "@/lib/ui/CatTail";
import FishBone from "@/lib/ui/FishBone";

export default function Layout({ children }: { children: React.ReactNode }) {
  const size = 200;
  return (
    <>
      {children}
      <div className="absolute top-0 hidden rotate-45 sm:block md:scale-150 lg:scale-[200%]">
        <CatPawNormal size={size} />
      </div>
      <div className="absolute bottom-0 right-0 hidden -rotate-45 sm:block lg:scale-125">
        <CatPawSharp size={size} />
      </div>
      <div className="absolute bottom-0 left-[10%] hidden rotate-[15deg] lg:block">
        <CatTail />
      </div>
      <div className="absolute bottom-1/2 right-[10%] hidden rotate-[37deg] xl:block">
        <FishBone size={200} />
      </div>
    </>
  );
}
