"use client";

import { useState } from "react";
import { ListingRow } from "@/components/listing-row";
import { LISTINGS, type Listing } from "@/lib/mock-data";
import { shuffle } from "@/lib/utils";

/**
 * Shuffles once per mount. Callers that want a fresh rotation when the
 * user leaves and comes back (a different category tab, a different page)
 * should conditionally mount this component rather than keep it always
 * rendered — unmount/remount naturally re-shuffles.
 */
export function BusinessCarousel({
  label = "Negocios de vecinos",
}: {
  label?: string;
}) {
  const [negocios] = useState<Listing[]>(() =>
    shuffle(LISTINGS.filter((l) => l.type === "negocio"))
  );

  if (negocios.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {negocios.map((listing) => (
          <div key={listing.id} className="w-64 shrink-0">
            <ListingRow listing={listing} />
          </div>
        ))}
      </div>
    </div>
  );
}
