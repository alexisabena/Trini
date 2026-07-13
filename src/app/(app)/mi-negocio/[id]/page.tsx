"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Lock,
  Phone,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDemoSession } from "@/lib/demo-session";
import { useMyBusinesses } from "@/lib/my-businesses";
import {
  CATEGORY_LABELS,
  MY_BUSINESS_STATUS_LABELS,
  type ListingCategory,
} from "@/lib/mock-data";

type FormState = {
  name: string;
  category: ListingCategory;
  description: string;
  hours: string;
  phone: string;
};

export default function MiNegocioDetailPage() {
  const { persona, hydrated } = useDemoSession();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { getBusiness, updateBusiness } = useMyBusinesses();

  const business = getBusiness(params.id);

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [form, setForm] = useState<FormState | null>(null);

  useEffect(() => {
    if (hydrated && persona !== "internal_business") {
      router.replace("/notificaciones");
    }
  }, [hydrated, persona, router]);

  useEffect(() => {
    if (business && !form) {
      setForm({
        name: business.name,
        category: business.category,
        description: business.description,
        hours: business.hours,
        phone: business.phone,
      });
    }
  }, [business, form]);

  useEffect(() => {
    if (hydrated && persona === "internal_business" && !business) {
      router.replace("/mi-negocio");
    }
  }, [hydrated, persona, business, router]);

  if (!hydrated || persona !== "internal_business" || !business || !form) {
    return null;
  }

  const isBlocked = business.status === "bloqueado";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form) return;
    const wasApproved = business!.status === "aprobado";
    updateBusiness(business!.id, form);
    setEditing(false);
    setSaved(true);
    setSavedMessage(
      wasApproved
        ? "Cambios guardados. Tu ficha vuelve a revisión antes de publicarse de nuevo."
        : "Cambios guardados."
    );
    setTimeout(() => setSaved(false), 4000);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-5">
      <Link
        href="/mi-negocio"
        className="inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Mis Negocios
      </Link>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
          <CheckCircle2 className="size-4 shrink-0" aria-hidden />
          {savedMessage}
        </div>
      )}

      {isBlocked && (
        <div className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
          <Lock className="size-4 shrink-0" aria-hidden />
          Este negocio está bloqueado. Contacta a la administración para más
          información — no se puede editar mientras esté bloqueado.
        </div>
      )}

      {!editing ? (
        <>
          <Card className="shadow-sm">
            <CardContent className="flex flex-col gap-3">
              <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <Store className="size-10" aria-hidden />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {CATEGORY_LABELS[form.category]}
                  </p>
                  <Badge
                    variant={
                      business.status === "aprobado"
                        ? "default"
                        : business.status === "bloqueado"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {MY_BUSINESS_STATUS_LABELS[business.status]}
                  </Badge>
                </div>
                <h2 className="text-lg font-bold">{form.name}</h2>
              </div>
              <p className="text-sm text-muted-foreground">{form.description}</p>
              <div className="flex flex-col gap-2 border-t border-border pt-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="size-4 text-muted-foreground" aria-hidden />
                  {form.hours}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="size-4 text-muted-foreground" aria-hidden />
                  {form.phone}
                </div>
              </div>
            </CardContent>
          </Card>
          <Button
            type="button"
            size="lg"
            className="h-14 text-lg font-bold"
            disabled={isBlocked}
            onClick={() => setEditing(true)}
          >
            Editar mi ficha
          </Button>
          <p className="text-center text-xs text-muted-foreground text-balance">
            Aquí solo puedes editar tu ficha. Las visitas y clics de contacto se
            reportan directamente a la administración.
          </p>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-base">
              Nombre del negocio
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-12 text-base"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="category" className="text-base">
              Categoría
            </Label>
            <select
              id="category"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as ListingCategory })
              }
              className="h-12 rounded-lg border border-input bg-background px-3 text-base"
            >
              {(Object.keys(CATEGORY_LABELS) as ListingCategory[]).map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-base">
              Descripción
            </Label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="rounded-lg border border-input bg-background px-3 py-2 text-base"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="hours" className="text-base">
              Horario
            </Label>
            <Input
              id="hours"
              value={form.hours}
              onChange={(e) => setForm({ ...form, hours: e.target.value })}
              className="h-12 text-base"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="text-base">
              Teléfono de contacto
            </Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="h-12 text-base"
              required
            />
          </div>

          {business.status === "aprobado" && (
            <p className="text-sm text-muted-foreground text-balance">
              Este negocio está aprobado. Guardar cambios lo regresará a
              revisión antes de volver a publicarse.
            </p>
          )}

          <div className="flex flex-col gap-2">
            <Button type="submit" size="lg" className="h-14 text-lg font-bold">
              Guardar cambios
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-11 text-base"
              onClick={() => setEditing(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
