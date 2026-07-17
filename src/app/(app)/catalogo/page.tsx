"use client";

import { useMemo, useState } from "react";
import { Store } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ListingRow } from "@/components/listing-row";
import { FeaturedListingCard } from "@/components/featured-listing-card";
import { BusinessCarousel } from "@/components/business-carousel";
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

  // "Todas" mixes categories, so a single pinned featured item wouldn't be
  // representative — it gets the same rotating carousel as Avisos instead,
  // and every listing (featured or not) shows as a regular row below.
  // A specific category has at most one featured listing (one paid slot
  // per category), so that one gets pinned at the top as a spotlight card.
  const featured = useMemo(
    () => (category === "todas" ? [] : filtered.filter((l) => l.featured)),
    [filtered, category]
  );
  const regular = useMemo(
    () =>
      category === "todas" ? filtered : filtered.filter((l) => !l.featured),
    [filtered, category]
  );
  const showCarousel = type === "negocio" && category === "todas";

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

      {showCarousel && <BusinessCarousel />}

      {featured.length > 0 && (
        <ul className="flex flex-col gap-3">
          {featured.map((listing) => (
            <li key={listing.id}>
              <FeaturedListingCard listing={listing} />
            </li>
          ))}
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
