import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import Providers from "./providers";
import { Header, ClientOnly, ModalRenderer } from "@/components";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "수강신청",
  description: "강의 등록 및 수강신청 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col w-full max-w-[600px] mx-auto px-4 py-6">
              <Header />
              {children}
            </main>
          </div>
          <ClientOnly>
            <Suspense>
              <ModalRenderer />
            </Suspense>
          </ClientOnly>
        </Providers>
      </body>
    </html>
  );
}
