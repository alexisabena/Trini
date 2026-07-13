"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  MY_BUSINESSES,
  type ListingCategory,
  type MyBusiness,
} from "@/lib/mock-data";

const STORAGE_KEY = "cluster-vecinal-demo-my-businesses";

type NewBusinessInput = {
  name: string;
  category: ListingCategory;
  description: string;
  hours: string;
  phone: string;
};

type MyBusinessesContextValue = {
  businesses: MyBusiness[];
  getBusiness: (id: string) => MyBusiness | undefined;
  /** Editing an `aprobado` listing sends it back to `en_revision` pending re-approval. */
  updateBusiness: (id: string, updates: NewBusinessInput) => MyBusiness;
  addBusiness: (input: NewBusinessInput) => MyBusiness;
};

const MyBusinessesContext = createContext<MyBusinessesContextValue | null>(null);

export function MyBusinessesProvider({ children }: { children: ReactNode }) {
  const [businesses, setBusinesses] = useState<MyBusiness[]>(MY_BUSINESSES);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as MyBusiness[];
        if (Array.isArray(parsed)) setBusinesses(parsed);
      } catch {
        // ignore malformed demo state
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(businesses));
  }, [businesses, hydrated]);

  function getBusiness(id: string) {
    return businesses.find((b) => b.id === id);
  }

  function updateBusiness(id: string, updates: NewBusinessInput) {
    let updated: MyBusiness | undefined;
    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        updated = {
          ...b,
          ...updates,
          status: b.status === "aprobado" ? "en_revision" : b.status,
        };
        return updated;
      })
    );
    return updated!;
  }

  function addBusiness(input: NewBusinessInput) {
    const newBusiness: MyBusiness = {
      id: `mine-${Date.now()}`,
      ...input,
      status: "en_revision",
    };
    setBusinesses((prev) => [...prev, newBusiness]);
    return newBusiness;
  }

  return (
    <MyBusinessesContext.Provider
      value={{ businesses, getBusiness, updateBusiness, addBusiness }}
    >
      {children}
    </MyBusinessesContext.Provider>
  );
}

export function useMyBusinesses() {
  const ctx = useContext(MyBusinessesContext);
  if (!ctx) {
    throw new Error("useMyBusinesses must be used inside MyBusinessesProvider");
  }
  return ctx;
}
