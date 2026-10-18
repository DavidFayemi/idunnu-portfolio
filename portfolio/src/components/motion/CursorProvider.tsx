"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type CursorVariant = "default" | "link" | "view" | "text" | "busy";
type CursorContextValue = {
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
  label: string;
  setLabel: (label: string) => void;
};
const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<CursorVariant>("default");
  const [label, setLabelState] = useState("");
  const setVariant = useCallback((value: CursorVariant) => setVariantState(value), []);
  const setLabel = useCallback((value: string) => setLabelState(value), []);
  const value = useMemo(() => ({ variant, setVariant, label, setLabel }), [label, setLabel, setVariant, variant]);
  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursorVariant(variant: CursorVariant, label = "") {
  const context = useContext(CursorContext);
  if (!context) throw new Error("useCursorVariant must be used within CursorProvider");
  const onPointerEnter = useCallback(() => {
    context.setVariant(variant);
    context.setLabel(label);
  }, [context, label, variant]);
  const onPointerLeave = useCallback(() => {
    context.setVariant("default");
    context.setLabel("");
  }, [context]);
  return useMemo(() => ({ onPointerEnter, onPointerLeave }), [onPointerEnter, onPointerLeave]);
}

export function useCursorContext() {
  const context = useContext(CursorContext);
  if (!context) throw new Error("useCursorContext must be used within CursorProvider");
  return context;
}