import LoginForm from "@/app/login/_components/LoginForm";
import Header from "@/app/login/_components/Header";

export default function Page() {
  return (
    <main className="flex h-[100dvh] flex-col items-center justify-center gap-12">
      <Header />
      <LoginForm />
    </main>
  );
}
