import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { REGLAMENTO_SECTIONS } from "@/lib/mock-data";

export default function ReglamentoPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-5">
      <div className="flex items-center gap-2">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <BookOpen className="size-5" aria-hidden />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Reglamento del Cluster</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Documento de consulta. Solo lectura — cualquier cambio lo publica la
        administración.
      </p>

      <div className="flex flex-col gap-3">
        {REGLAMENTO_SECTIONS.map((section, i) => (
          <Card key={section.id} className="shadow-sm">
            <CardContent className="flex flex-col gap-1.5">
              <h2 className="text-base font-bold">
                {i + 1}. {section.title}
              </h2>
              <p className="text-sm text-muted-foreground">{section.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
