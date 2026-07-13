"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDemoSession, type DemoPersona } from "@/lib/demo-session";

const PERSONAS: { value: DemoPersona; label: string; hint: string }[] = [
  {
    value: "neighbor",
    label: "Vecino",
    hint: "Acceso de solo lectura: avisos, catálogo y reglamento.",
  },
  {
    value: "internal_business",
    label: "Negocio interno",
    hint: 'Igual que Vecino, más la pestaña "Mi Negocio" para autoeditar su ficha.',
  },
];

export function DemoHeader() {
  const { persona, setPersona, logout } = useDemoSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/95 px-4 py-2.5 backdrop-blur supports-backdrop-filter:bg-background/80">
      <span className="text-base font-bold tracking-tight">Cluster Vecinal</span>

      <Sheet open={open} onOpenChange={setOpen}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground"
        >
          <ShieldCheck className="size-3.5" aria-hidden />
          Modo demo
        </button>
        <SheetContent side="bottom" className="pb-8">
          <SheetHeader>
            <SheetTitle>Cambiar de vista de demo</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-3 px-4">
            {PERSONAS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => {
                  setPersona(p.value);
                  setOpen(false);
                }}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left transition-colors",
                  persona === p.value
                    ? "border-primary bg-primary/5"
                    : "border-border"
                )}
              >
                <p className="text-base font-bold">{p.label}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{p.hint}</p>
              </button>
            ))}
            <Button
              type="button"
              variant="ghost"
              className="mt-2 h-11 justify-start gap-2 text-destructive hover:text-destructive"
              onClick={() => {
                logout();
                setOpen(false);
                router.replace("/");
              }}
            >
              <LogOut className="size-4" aria-hidden />
              Cerrar sesión (demo)
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
