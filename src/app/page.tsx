import { api } from "@/trpc/server";
import Header from "@/app/_components/Header";
import Conversation from "@/app/_components/Conversation";
import Prompt from "@/app/_components/Prompt";
import Footer from "@/app/_components/Footer";
import { ConversationProvider } from "@/app/_components/ConversationProvider";

export default function Home() {
  // const test = await api.openAI.chatCompletionPrompt([
  //   {
  //     content: "What do you do when you are anxious?",
  //     role: "user",
  //   },
  // ]);
  // console.log(test);

  // void api.post.getLatest.prefetch();

  return (
    <ConversationProvider>
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
    </ConversationProvider>
  );
}
