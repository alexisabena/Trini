import Link from "next/link";
import { ChevronRight, Sparkles, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS, type Listing } from "@/lib/mock-data";

export function FeaturedListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/catalogo/${listing.id}`}>
      <Card className="gap-0 overflow-hidden py-0 shadow-sm transition-colors hover:bg-muted/40">
        <div className="relative flex aspect-[3/1] w-full items-center justify-center bg-secondary text-secondary-foreground">
          <Store className="size-7" aria-hidden />
          <Badge
            variant="secondary"
            className="absolute top-2.5 left-2.5 gap-1 bg-background/90 shadow-sm"
          >
            <Sparkles className="size-3" aria-hidden />
            Destacado
          </Badge>
        </div>
        <CardContent className="flex items-center gap-3 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold">{listing.name}</p>
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
  );
}
