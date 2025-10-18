"use client";

import { GlobalHeader } from "@ruasvivas/ui";
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
    <GlobalHeader
      className="flex flex-col mx-0 h-full justify-start"
      orientation="left"
    >
      {/* Botão mobile para abrir nav */}
      <button
        className="lg:hidden p-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Abrir menu de navegação"
      >
        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* TODO: transformar em menu dropdown com hover abre ao lado, e exibe ícones quando recolhido */}
      <nav className="hidden lg:flex lg:w-full lg:flex-col text-dark">
        <div className="mt-auto">
          <div className="h-12 w-full flex justify-center items-center">
            <div className="font-medium">Bem-vindo, Ruan</div>
          </div>
          <div className="h-12 w-full flex justify-center items-center">
            <button className="flex items-center justify-center px-3 py-1 rounded bg-secondary text-white hover:bg-secondary-dark">
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* Navegação mobile com Transition */}
      <Transition
        show={mobileOpen}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 -translate-x-2"
        enterTo="opacity-100 translate-x-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 -translate-x-2"
      >
        <div
          ref={menuRef}
          className="absolute z-100 top-0 w-max left-full bg-white shadow-md border-b border-light lg:hidden"
        >
          <nav className="container px-4">
            <div className="h-12 w-full flex justify-center items-center">
              <div className="text-center font-medium">Bem-vindo, Ruan</div>
            </div>
            <div className="h-12 w-full flex justify-center items-center">
              <button className="flex items-center justify-center px-3 py-1 rounded bg-secondary text-white hover:bg-secondary-dark">
                Sair
              </button>
            </div>
          </nav>
        </div>
      </Transition>
    </GlobalHeader>
  );
}
