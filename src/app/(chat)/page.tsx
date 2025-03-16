import Conversation from "@/app/(chat)/_components/Conversation";
import Footer from "@/app/(chat)/_components/Footer";
import Header from "@/app/(chat)/_components/Header";
import Prompt from "@/app/(chat)/_components/Prompt";

export default async function Home() {
  return (
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
  );
}
