import { api } from "@/trpc/server";
import { LatestPost } from "./_components/post";
import Header from "@/app/_components/header";
import Conversation from "@/app/_components/conversation";
import Prompt from "@/app/_components/prompt";
import Footer from "@/app/_components/footer";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <main className="flex h-[100dvh] flex-col px-4">
      <header>
        <Header />
      </header>
      <section className="flex-grow overflow-y-auto">
        <Conversation />
      </section>
      <section>
        <Prompt />
      </section>
      <footer>
        <Footer />
      </footer>
    </main>
  );
}
