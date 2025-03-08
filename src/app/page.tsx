import { api } from "@/trpc/server";
import Header from "@/app/_components/header";
import Conversation from "@/app/_components/conversation";
import Prompt from "@/app/_components/prompt";
import Footer from "@/app/_components/footer";

export default async function Home() {
  // const test = await api.openAI.chatCompletionPrompt([
  //   {
  //     content: "What is the best species of cat?",
  //     role: "user",
  //   },
  // ]);
  // console.log(test);

  // void api.post.getLatest.prefetch();

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
