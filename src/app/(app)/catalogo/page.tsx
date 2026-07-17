"use client";

import { useMemo, useState } from "react";
import { Store } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, pickRandom } from "@/lib/utils";
import { ListingRow } from "@/components/listing-row";
import { FeaturedListingCard } from "@/components/featured-listing-card";
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

  // Every negocio listing is already a paying advertiser — there's no
  // "the featured one" business, only a rotating promotional spot: one per
  // category (occupant picked at random from that category's businesses),
  // plus one discrete spot on "Todas" (picked from every negocio). The pick
  // is stable while browsing the same view and re-rolls whenever the view
  // changes — including returning to a view already left, since `filtered`
  // gets a new reference each time `category` changes.
  const spotlight = useMemo(
    () => (type === "negocio" ? pickRandom(filtered) : undefined),
    [type, filtered]
  );
  const regular = useMemo(
    () => filtered.filter((l) => l.id !== spotlight?.id),
    [filtered, spotlight]
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
          <TabsTrigger value="proveedor" className="h-full text-sm font-semibold">
            Proveedores Oficiales
          </TabsTrigger>
          <TabsTrigger value="negocio" className="h-full text-sm font-semibold">
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

      {spotlight && category === "todas" && (
        <ul className="flex flex-col gap-3">
          <li>
            <ListingRow listing={spotlight} featured />
          </li>
        </ul>
      )}

      {spotlight && category !== "todas" && (
        <ul className="flex flex-col gap-3">
          <li>
            <FeaturedListingCard listing={spotlight} />
          </li>
        </ul>
      )}

      <ul className="flex flex-col gap-3">
        {regular.map((listing) => (
          <li key={listing.id}>
            <ListingRow listing={listing} />
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
