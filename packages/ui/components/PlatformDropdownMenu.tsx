"use client";

import { Menu, MenuButton, MenuItem, MenuItems, MenuItemsProps } from "@headlessui/react";
import { cn } from "@ruasvivas/lib";
import { FaCogs } from "react-icons/fa";
import { apps } from "@ruasvivas/config";
import Logo from "./Logo";

type Module = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const modules: Module[] = [
  {
    title: "Ruas Vivas",
    href: apps.ruasVivas,
    icon: <Logo type="wordmark" />
  },
  {
    title: "Sistema",
    href: apps.sistema,
    icon: <FaCogs size={48} />,
  },
];

interface PlatformDropdownMenuProps {
  anchor?: MenuItemsProps["anchor"];
}

export default function PlatformDropdownMenu({ anchor = "bottom" }: PlatformDropdownMenuProps) {
  if (!modules.length) return null;

  return (
    <Menu as="div" className="relative flex items-center text-left">
      <MenuButton className="rounded-sm inline-flex justify-center p-2 bg-primary-light text-white hover:bg-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-8"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="6" y="6" width="8" height="8" rx="1" />
          <rect x="18" y="6" width="8" height="8" rx="1" />
          <rect x="6" y="18" width="8" height="8" rx="1" />
          <rect x="18" y="18" width="8" height="8" rx="1" />
        </svg>
      </MenuButton>

      <MenuItems
        anchor={anchor}
        className={cn(
          "absolute z-100 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none p-3 grid gap-3",
          { ["grid-cols-2 w-64"]: modules.length > 1 }
        )}
      >
        {modules.map((mod) => (
          <MenuItem
            key={mod.title}
            as="a"
            href={mod.href}
            target="_blank"
            rel="noopener noreferrer"
            className={({ active }) =>
              `flex flex-col items-center justify-center p-3 rounded-md transition aspect-square ${
                active ? "bg-light" : ""
              }`
            }
          >
            {({ active }) => (
              <>
                <div className="text-primary size-16 flex items-center justify-center">{mod.icon}</div>
                <span
                  className={cn("text-sm mt-1 line-clamp-1 text-center", {
                    ["line-clamp-none"]: active,
                  })}
                >
                  {mod.title}
                </span>
              </>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
