import { AlertTriangle, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NOTIFICATIONS } from "@/lib/mock-data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NotificacionesPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-5">
      <div className="flex items-center gap-2">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Bell className="size-5" aria-hidden />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Avisos</h1>
      </div>

      <ul className="flex flex-col gap-3">
        {NOTIFICATIONS.map((n) => (
          <li key={n.id}>
            <Card
              className={
                n.urgent
                  ? "border-destructive/40 bg-destructive/5 shadow-sm"
                  : "shadow-sm"
              }
            >
              <CardContent className="flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-base font-bold text-balance">{n.title}</h2>
                  {n.urgent && (
                    <Badge variant="destructive" className="shrink-0 gap-1">
                      <AlertTriangle className="size-3" aria-hidden />
                      Urgente
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  {formatDate(n.date)}
                </p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
