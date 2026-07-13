"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDemoSession } from "@/lib/demo-session";
import { DemoHeader } from "@/components/demo-header";
import { BottomNav } from "@/components/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { authed, hydrated } = useDemoSession();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !authed) {
      router.replace("/");
    }
  }, [hydrated, authed, router]);

  if (!hydrated || !authed) {
    return null;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-muted/30">
      <DemoHeader />
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
