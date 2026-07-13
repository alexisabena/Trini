"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDemoSession } from "@/lib/demo-session";
import { useMyBusinesses } from "@/lib/my-businesses";
import { CATEGORY_LABELS, type ListingCategory } from "@/lib/mock-data";

const CATEGORY_KEYS = Object.keys(CATEGORY_LABELS) as ListingCategory[];

export default function NuevoNegocioPage() {
  const { persona, hydrated } = useDemoSession();
  const router = useRouter();
  const { addBusiness } = useMyBusinesses();

  const [form, setForm] = useState({
    name: "",
    category: CATEGORY_KEYS[0],
    description: "",
    hours: "",
    phone: "",
  });

  useEffect(() => {
    if (hydrated && persona !== "internal_business") {
      router.replace("/notificaciones");
    }
  }, [hydrated, persona, router]);

  if (!hydrated || persona !== "internal_business") {
    return null;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const created = addBusiness(form);
    router.push(`/mi-negocio/${created.id}`);
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

      <div>
        <h1 className="text-xl font-bold tracking-tight">
          Registrar nuevo negocio
        </h1>
        <p className="mt-1 text-sm text-muted-foreground text-balance">
          Tu negocio quedará en revisión hasta que la administración lo
          apruebe.
        </p>
      </div>

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
            {CATEGORY_KEYS.map((c) => (
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
            placeholder="Cuéntanos qué ofreces, para quién y cómo trabajas."
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
            placeholder="Ej. Lun–Vie 9:00–18:00"
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

        <Button type="submit" size="lg" className="h-14 text-lg font-bold">
          Enviar a revisión
        </Button>
      </form>
    </div>
  );
}
