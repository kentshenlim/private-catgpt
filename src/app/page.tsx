import { api } from "@/trpc/server";
import { LatestPost } from "./_components/post";
import Header from "@/app/_components/header";
import Prompt from "./_components/prompt";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <main>
      <Header></Header>
      <Prompt></Prompt>
    </main>
  );
}
