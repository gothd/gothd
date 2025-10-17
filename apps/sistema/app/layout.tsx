import { Cinzel, Inter } from "next/font/google";
import "@ruasvivas/assets/globals.css";
import { PropsWithChildren } from "react";
import { Metadata } from "next";
import AsideNavbar from "../components/AsideNavbar"

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
  title: "Sistema :: Ruas Vivas",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cinzel.variable}`}>
       <body className="flex h-screen bg-gray-50">
      <AsideNavbar />

      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white shadow flex items-center justify-between px-4">
          <span className="font-medium">Bem-vindo, Ruan</span>
          <button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Sair</button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </body>
    </html>
  );
}
