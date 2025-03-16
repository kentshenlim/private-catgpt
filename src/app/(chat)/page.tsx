import Conversation from "@/app/(chat)/_components/Conversation";
import Footer from "@/app/(chat)/_components/Footer";
import Header from "@/app/(chat)/_components/Header";
import Prompt from "@/app/(chat)/_components/Prompt";

export default async function Home() {
  return (
    <main className="flex h-[100dvh] flex-col">
      <header className="px-4">
        <Header />
      </header>
      <div className="mx-auto flex min-h-0 w-full flex-grow flex-col">
        <section className="conversation-window min-h-0 flex-grow overflow-y-auto">
          <Conversation />
        </section>
        <section className="prompt-window">
          <Prompt />
        </section>
        <footer>
          <Footer />
        </footer>
      </div>
    </main>
  );
}
