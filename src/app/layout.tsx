import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/shared/providers";
import { twMerge } from "tailwind-merge";
import type { Metadata } from "next";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authentication | Gestão de identidade",
  description:
    "Aplicação de autenticação e gestão de contas com Next.js, TypeScript e integração com API externa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={twMerge(geistSans.variable, geistMono.variable, "h-full antialiased dark")}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
