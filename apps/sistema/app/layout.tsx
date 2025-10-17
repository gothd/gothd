import { Cinzel, Inter } from "next/font/google";
import "@ruasvivas/assets/globals.css";
import { PropsWithChildren } from "react";
import { Metadata } from "next";
import AsideNavbar from "../components/AsideNavbar";
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
  title: "Sistema :: Ruas Vivas",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="min-h-screen bg-light">
        <Header />

        <div className="flex min-h-[calc(100vh_-_4rem)]">
          <AsideNavbar />

          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
