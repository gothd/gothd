"use client";

import { ReactNode } from "react";
import PlatformDropdownMenu from "./PlatformDropdownMenu";
import Logo from "./Logo";
import Link from "next/link";

type GlobalHeaderProps = {
  logo?: ReactNode;
  logoHref?: string;
  children?: ReactNode;
  lgNavPosition?: "left" | "center";
};

export default function GlobalHeader({
  logo,
  logoHref = "/",
  lgNavPosition = "center",
  children,
}: GlobalHeaderProps) {
  return (
    <header className="relative z-50 w-full border-b border-b-light bg-white">
      <div className="container mx-auto flex items-center gap-3 py-3 px-4">
        {/* Navegação: no mobile vem primeiro, no desktop centralizada (order-1) */}
        <div
          className={`flex lg:flex-1 ${
            lgNavPosition === "center" && "lg:order-1"
          }`}
        >
          {children}
        </div>

        {/* Logo */}
        <Link
          href={logoHref}
          className={lgNavPosition === "center" && "lg:order-0"}
        >
          {logo ?? <Logo type="monograma" width={48} />}
        </Link>

        {/* Dropdown da plataforma (lado direito) */}
        <div
          className={`ml-auto ${lgNavPosition === "center" && "lg:order-2"}`}
        >
          <PlatformDropdownMenu />
        </div>
      </div>
    </header>
  );
}
