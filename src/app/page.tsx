"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Home, MessageCircleMore, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDemoSession } from "@/lib/demo-session";

const DEMO_OTP = "123456";

type Step = "phone" | "otp";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { authed, hydrated, login } = useDemoSession();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && authed) {
      router.replace("/notificaciones");
    }
  }, [hydrated, authed, router]);

  function handlePhoneSubmit(e: FormEvent) {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Ingresa un número de teléfono a 10 dígitos.");
      return;
    }
    setError("");
    setStep("otp");
  }

  function handleOtpSubmit(e: FormEvent) {
    e.preventDefault();
    if (otp !== DEMO_OTP) {
      setError("Código incorrecto. En modo demo, usa 123456.");
      return;
    }
    setError("");
    login();
    router.replace("/notificaciones");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-3 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            <ShieldCheck className="size-3.5" aria-hidden />
            Modo demo
          </span>
        </div>

        <div className="mb-7 flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Home className="size-7" aria-hidden />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-balance">
              Cluster Vecinal
            </h1>
            <p className="mt-1 text-base text-muted-foreground text-balance">
              Tu fraccionamiento, en un solo lugar.
            </p>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="pt-2">
            {step === "phone" && (
              <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone" className="text-base">
                    Número de teléfono
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="55 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-14 text-lg"
                    aria-describedby={error ? "phone-error" : undefined}
                  />
                  <p className="text-sm text-muted-foreground">
                    Te enviaremos un código por WhatsApp para entrar. Sin
                    contraseñas.
                  </p>
                </div>
                {error && (
                  <p id="phone-error" role="alert" className="text-sm font-medium text-destructive">
                    {error}
                  </p>
                )}
                <Button type="submit" size="lg" className="h-14 text-lg font-bold">
                  <MessageCircleMore className="size-5" aria-hidden />
                  Enviar código por WhatsApp
                </Button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="otp" className="text-base">
                    Código de verificación
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enviamos un código por WhatsApp al{" "}
                    <span className="font-semibold text-foreground">{phone}</span>
                  </p>
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    autoComplete="one-time-code"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="h-14 text-center text-2xl tracking-[0.5em] font-bold"
                    aria-describedby={error ? "otp-error" : "otp-hint"}
                  />
                  <p id="otp-hint" className="text-sm text-muted-foreground">
                    Modo demo — usa el código <strong>123456</strong>.
                  </p>
                </div>
                {error && (
                  <p id="otp-error" role="alert" className="text-sm font-medium text-destructive">
                    {error}
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  <Button type="submit" size="lg" className="h-14 text-lg font-bold">
                    Ingresar
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-11 text-base"
                    onClick={() => {
                      setStep("phone");
                      setOtp("");
                      setError("");
                    }}
                  >
                    Cambiar número
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
