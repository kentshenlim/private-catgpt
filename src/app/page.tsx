import Conversation from "@/app/_components/Conversation";
import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import Prompt from "@/app/_components/Prompt";
import { ConversationProvider } from "@/app/_states/ConversationProvider";

export default function Home() {
  return (
    <ConversationProvider>
      <main className="flex h-[100dvh] flex-col [&>*]:px-4">
        <header>
          <Header />
        </header>
        <section className="flex flex-grow overflow-y-auto !px-0">
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
