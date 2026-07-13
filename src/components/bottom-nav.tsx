"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Store, BookOpen, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDemoSession } from "@/lib/demo-session";

const BASE_ITEMS = [
  { href: "/notificaciones", label: "Avisos", icon: Bell },
  { href: "/catalogo", label: "Catálogo", icon: Store },
  { href: "/reglamento", label: "Reglamento", icon: BookOpen },
];

const BUSINESS_ITEM = { href: "/mi-negocio", label: "Mis Negocios", icon: Briefcase };

export function BottomNav() {
  const pathname = usePathname();
  const { persona } = useDemoSession();
  const items =
    persona === "internal_business" ? [...BASE_ITEMS, BUSINESS_ITEM] : BASE_ITEMS;

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul
        className={cn(
          "mx-auto grid max-w-md",
          items.length === 4 ? "grid-cols-4" : "grid-cols-3"
        )}
      >
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[56px] flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-semibold transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="size-6" aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
