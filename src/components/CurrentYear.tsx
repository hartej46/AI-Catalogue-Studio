"use client";

import { useEffect, useState, startTransition } from "react";

export function CurrentYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    startTransition(() => {
      setYear(new Date().getFullYear());
    });
  }, []);

  return <time dateTime={year ? String(year) : undefined}>{year ?? "…"}</time>;
}

