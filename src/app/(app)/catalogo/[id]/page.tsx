import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, MessageCircleMore, Phone, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS, LISTINGS } from "@/lib/mock-data";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = LISTINGS.find((l) => l.id === id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-5">
      <Link
        href="/catalogo"
        className="inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Volver al catálogo
      </Link>

      <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
        <Store className="size-12" aria-hidden />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{CATEGORY_LABELS[listing.category]}</Badge>
          <Badge variant={listing.type === "proveedor" ? "secondary" : "default"}>
            {listing.type === "proveedor" ? "Proveedor Oficial" : "Negocio de Vecino"}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          {listing.name}
        </h1>
        <p className="text-base text-muted-foreground text-balance">
          {listing.description}
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-start gap-2.5">
          <Clock className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
          <div>
            <p className="text-sm font-semibold">Horario</p>
            <p className="text-sm text-muted-foreground">{listing.hours}</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Phone className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
          <div>
            <p className="text-sm font-semibold">Teléfono</p>
            <p className="text-sm text-muted-foreground">{listing.phone}</p>
          </div>
        </div>
      </div>

      <Button
        size="lg"
        className="h-14 text-lg font-bold"
        nativeButton={false}
        render={
          <a
            href={`https://wa.me/${listing.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          />
        }
      >
        <MessageCircleMore className="size-5" aria-hidden />
        Contactar por WhatsApp
      </Button>
    </div>
  );
}
