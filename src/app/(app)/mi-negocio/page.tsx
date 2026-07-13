"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, ChevronRight, Plus, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDemoSession } from "@/lib/demo-session";
import { useMyBusinesses } from "@/lib/my-businesses";
import { CATEGORY_LABELS, MY_BUSINESS_STATUS_LABELS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function MisNegociosPage() {
  const { persona, hydrated } = useDemoSession();
  const router = useRouter();
  const { businesses } = useMyBusinesses();

  useEffect(() => {
    if (hydrated && persona !== "internal_business") {
      router.replace("/notificaciones");
    }
  }, [hydrated, persona, router]);

  if (!hydrated || persona !== "internal_business") {
    return null;
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-5">
      <div className="flex items-center gap-2">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Briefcase className="size-5" aria-hidden />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Mis Negocios</h1>
      </div>

      <ul className="flex flex-col gap-3">
        {businesses.map((business) => (
          <li key={business.id}>
            <Link href={`/mi-negocio/${business.id}`}>
              <Card className="shadow-sm transition-colors hover:bg-muted/40">
                <CardContent className="flex items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    <Store className="size-5" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-base font-bold">
                        {business.name}
                      </p>
                      <Badge
                        variant={
                          business.status === "aprobado"
                            ? "default"
                            : business.status === "bloqueado"
                              ? "destructive"
                              : "outline"
                        }
                        className="shrink-0"
                      >
                        {MY_BUSINESS_STATUS_LABELS[business.status]}
                      </Badge>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {CATEGORY_LABELS[business.category]}
                    </p>
                  </div>
                  <ChevronRight
                    className="size-5 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>

      <Button
        size="lg"
        variant="outline"
        className={cn("h-14 justify-start gap-2 text-base font-bold")}
        nativeButton={false}
        render={<Link href="/mi-negocio/nuevo" />}
      >
        <Plus className="size-5" aria-hidden />
        Registrar nuevo negocio
      </Button>

      <p className="text-center text-xs text-muted-foreground text-balance">
        Cada negocio se aprueba por separado. Las visitas y clics de contacto
        se reportan directamente a la administración.
      </p>
    </div>
  );
}
