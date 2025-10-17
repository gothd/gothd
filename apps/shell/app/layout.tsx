import { Logo } from "@ruasvivas/ui";
import { Cinzel, Inter } from "next/font/google";
import "@ruasvivas/assets/globals.css";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { Metadata } from "next";
import Header from "../components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Ruas Vivas",
  description:
    "Laboratório nômade de cidades, documentando cada lugar por onde passo, transformo observações em design, dados e tecnologia.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
        <footer className="border-t border-gray-200 text-center py-6 text-sm text-gray-500">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <div>
              © {new Date().getFullYear()} <Logo type="wordmark" /> — com os pés
              nas ruas
            </div>
            <nav className="flex gap-4 mt-2 sm:mt-0">
              <Link href="/termos" className="hover:underline">
                Termos de Uso
              </Link>
              <Link href="/privacidade" className="hover:underline">
                Política de Privacidade
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
