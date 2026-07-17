import Link from "next/link";
import { ChevronRight, Sparkles, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS, type Listing } from "@/lib/mock-data";

export function ListingRow({
  listing,
  featured = false,
}: {
  listing: Listing;
  /**
   * Whether this listing currently occupies a rotating promotional spot —
   * a presentational fact decided by the caller each render, not a
   * property of the listing itself. See catalogo/page.tsx.
   */
  featured?: boolean;
}) {
  return (
    <Link href={`/catalogo/${listing.id}`}>
      <Card className="shadow-sm transition-colors hover:bg-muted/40">
        <CardContent className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <Store className="size-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold">{listing.name}</p>
            <div className="flex min-w-0 items-center gap-1.5">
              <p className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                {CATEGORY_LABELS[listing.category]}
              </p>
              {featured && (
                <Badge variant="secondary" className="shrink-0 gap-1">
                  <Sparkles className="size-3" aria-hidden />
                  Destacado
                </Badge>
              )}
            </div>
          </div>
          <ChevronRight
            className="size-5 shrink-0 text-muted-foreground"
            aria-hidden
          />
        </CardContent>
      </Card>
    </Link>
  );
}
