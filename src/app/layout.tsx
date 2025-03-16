import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { ConversationProvider } from "@/app/_states/ConversationProvider";
import { ThemeProvider } from "@/app/_states/ThemeProvider";

export const metadata: Metadata = {
  title: "CatGPT",
  description: "Chat app with OpenAI integration",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} overflow-hidden`}
      id="html-root"
    >
      <body className="bg-background text-text">
        <TRPCReactProvider>
          <ThemeProvider>
            <ConversationProvider>{children}</ConversationProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
