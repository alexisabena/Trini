"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type DemoPersona = "neighbor" | "internal_business";

type DemoSession = {
  authed: boolean;
  persona: DemoPersona;
  hydrated: boolean;
  login: () => void;
  logout: () => void;
  setPersona: (persona: DemoPersona) => void;
};

const DemoSessionContext = createContext<DemoSession | null>(null);

const STORAGE_KEY = "cluster-vecinal-demo-session";

export function DemoSessionProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [persona, setPersonaState] = useState<DemoPersona>("neighbor");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { authed?: boolean; persona?: string };
        if (typeof parsed.authed === "boolean") setAuthed(parsed.authed);
        if (parsed.persona === "neighbor" || parsed.persona === "internal_business") {
          setPersonaState(parsed.persona);
        }
      } catch {
        // ignore malformed demo state
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ authed, persona }));
  }, [authed, persona, hydrated]);

  const value: DemoSession = {
    authed,
    persona,
    hydrated,
    login: () => setAuthed(true),
    logout: () => setAuthed(false),
    setPersona: setPersonaState,
  };

  return (
    <DemoSessionContext.Provider value={value}>
      {children}
    </DemoSessionContext.Provider>
  );
}

export function useDemoSession() {
  const ctx = useContext(DemoSessionContext);
  if (!ctx) {
    throw new Error("useDemoSession must be used inside DemoSessionProvider");
  }
  return ctx;
}
