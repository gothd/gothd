"use client";

import { ReactNode } from "react";
import PlatformDropdownMenu from "./PlatformDropdownMenu";
import Logo from "./Logo";
import Link from "next/link";
import { cn } from "@ruasvivas/lib/utils";

type GlobalHeaderProps = React.ComponentProps<"div"> & {
  logo?: ReactNode;
  logoHref?: string;
  children?: ReactNode;
  orientation?: "top" | "left" | "right";
} & (
    | {
        lgNavPosition?: "left" | "center";
      }
    | {
        /** Propõe um layout vertical */
        lgNavPosition?: "right";
        lgPlatformMenuOrder?: "second" | "last";
      }
  );

export default function GlobalHeader(props: GlobalHeaderProps) {
  const { className, children, logo, logoHref = "/", orientation = "top", lgNavPosition = orientation === "top"  ? "center" : "right" } = props;
  const lgPlatformMenuOrder = props.lgNavPosition === "right" ? props.lgPlatformMenuOrder ?? "second" : lgNavPosition === "center" ? "last" : "second";
  return (
    <header className="relative z-50 border-b border-b-light bg-white">
      <div className={cn("container mx-auto flex items-center justify-center gap-3 py-3 px-4", className)}>
        {/* Navegação: no mobile vem primeiro, no desktop centralizada (order-2), ou por último num layout vertical */}
        <div className={cn("flex lg:flex-1 order-1 lg:order-2")}>{children}</div>

        {/* Logo */}
        <Link
          href={logoHref}
          className={cn("order-2 lg:order-2", {
            "lg:order-1": orientation === "top" || lgNavPosition === "center" || lgPlatformMenuOrder === "second",
          })}
        >
          {logo ?? <Logo type="monograma" width={48} />}
        </Link>

        {/* Dropdown da plataforma (lado direito no top) */}
        <div
          className={cn("order-3 lg:order-3", {
            "lg:order-2": lgPlatformMenuOrder === "second",
            "ml-auto": orientation === "top",
            "mt-auto": orientation !== "top",
          })}
        >
          <PlatformDropdownMenu {...(lgNavPosition === "right" && { anchor: orientation })} />
        </div>
      </div>
    </header>
  );
}
