"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles, Store } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CATEGORY_LABELS,
  LISTINGS,
  type ListingCategory,
  type ListingType,
} from "@/lib/mock-data";

export default function CatalogoPage() {
  const [type, setType] = useState<ListingType>("proveedor");
  const [category, setCategory] = useState<ListingCategory | "todas">("todas");

  const typeListings = useMemo(
    () => LISTINGS.filter((l) => l.type === type),
    [type]
  );

  const categories = useMemo(() => {
    const present = new Set(typeListings.map((l) => l.category));
    return (Object.keys(CATEGORY_LABELS) as ListingCategory[]).filter((c) =>
      present.has(c)
    );
  }, [typeListings]);

  const filtered = useMemo(
    () =>
      category === "todas"
        ? typeListings
        : typeListings.filter((l) => l.category === category),
    [typeListings, category]
  );

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-5">
      <div className="flex items-center gap-2">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Store className="size-5" aria-hidden />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Catálogo</h1>
      </div>

      <Tabs
        value={type}
        onValueChange={(v) => {
          setType(v as ListingType);
          setCategory("todas");
        }}
      >
        <TabsList className="!h-14 w-full">
          <TabsTrigger value="proveedor" className="h-full text-base font-semibold">
            Proveedores Oficiales
          </TabsTrigger>
          <TabsTrigger value="negocio" className="h-full text-base font-semibold">
            Negocios de Vecinos
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        <button
          type="button"
          onClick={() => setCategory("todas")}
          className={cn(
            "min-h-9 shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
            category === "todas"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-foreground"
          )}
        >
          Todas
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "min-h-9 shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
              category === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground"
            )}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-3">
        {filtered.map((listing) => (
          <li key={listing.id}>
            <Link href={`/catalogo/${listing.id}`}>
              <Card className="shadow-sm transition-colors hover:bg-muted/40">
                <CardContent className="flex items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    <Store className="size-5" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-base font-bold">
                        {listing.name}
                      </p>
                      {listing.featured && (
                        <Badge variant="secondary" className="shrink-0 gap-1">
                          <Sparkles className="size-3" aria-hidden />
                          Destacado
                        </Badge>
                      )}
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {CATEGORY_LABELS[listing.category]}
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
        {filtered.length === 0 && (
          <li className="py-8 text-center text-sm text-muted-foreground">
            No hay resultados en esta categoría.
          </li>
        )}
      </ul>
    </div>
  );
}
