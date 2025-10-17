"use client";

import { GlobalHeader } from "@ruasvivas/ui";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Transition } from "@headlessui/react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    }

    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

  return (
    <GlobalHeader>
      {/* Botão mobile para abrir nav */}
      <button
        className="lg:hidden p-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Abrir menu de navegação"
      >
        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <nav className="hidden lg:flex lg:w-full lg:justify-evenly gap-x-6 h-8 text-dark">
        <Link href="/cidades" className="hover:text-ruas-verde">
          Cidades
        </Link>
        <Link href="/projetos" className="hover:text-ruas-verde">
          Projetos
        </Link>
        <Link href="/expedicoes" className="hover:text-ruas-verde">
          Expedições
        </Link>
        <Link href="/colabore" className="hover:text-ruas-verde">
          Colabore
        </Link>
        <Link href="/sobre" className="hover:text-ruas-verde">
          Sobre
        </Link>
      </nav>

      {/* Navegação mobile com Transition */}
      <Transition
        show={mobileOpen}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <div
          ref={menuRef}
          className="absolute top-full left-0 right-0 bg-white shadow-md border-b border-light lg:hidden"
        >
          <nav className="container px-4 py-2 ml-10">
            <Link className="h-12 w-full flex justify-center items-center" href="/cidades">
              Cidades
            </Link>
            <Link className="h-12 w-full flex justify-center items-center" href="/projetos">
              Projetos
            </Link>
            <Link className="h-12 w-full flex justify-center items-center" href="/expedicoes">
              Expedições
            </Link>
            <Link className="h-12 w-full flex justify-center items-center" href="/colabore">
              Colabore
            </Link>
            <Link className="h-12 w-full flex justify-center items-center" href="/sobre">
              Sobre
            </Link>
          </nav>
        </div>
      </Transition>
    </GlobalHeader>
  );
}
