"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@ruasvivas/lib/utils";

export default function AsideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Carregar estado salvo no localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  // Salvar sempre que mudar
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(isCollapsed));
  }, [isCollapsed]);

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-52"
      } max-h-[calc(100vh_-_4rem)] bg-white shadow-md transition-all duration-300 flex flex-col`}
    >
      {/* Navegação */}
      <nav className="flex-1 py-2 flex items-center flex-col gap-2 overflow-y-auto">
        <Link
          href="/"
          className={cn(
            "w-full min-h-12 px-6 flex items-center justify-center gap-2 rounded hover:bg-light",
            {
              ["justify-start"]: !isCollapsed,
            }
          )}
        >
          <span>🏠</span>
          {!isCollapsed && <span>Painel</span>}
        </Link>
        <Link
          href="/usuarios"
          className={cn(
            "w-full min-h-12 px-6 flex items-center justify-center gap-2 rounded hover:bg-light",
            {
              ["justify-start"]: !isCollapsed,
            }
          )}
        >
          <span>👥</span>
          {!isCollapsed && <span>Usuários</span>}
        </Link>
        <Link
          href="/config"
          className={cn(
            "w-full mt-auto min-h-12 px-6 flex items-center justify-center gap-2 rounded hover:bg-light",
            {
              ["justify-start"]: !isCollapsed,
            }
          )}
        >
          <span>⚙️</span>
          {!isCollapsed && <span>Configurações</span>}
        </Link>
      </nav>

      {/* Botão de expandir/retrair menu */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn("w-full h-12 px-6 flex justify-center items-center rounded hover:bg-light", !isCollapsed && "justify-start")}
      >
        {isCollapsed ? "➡️" : "⬅️"}
      </button>
    </aside>
  );
}
