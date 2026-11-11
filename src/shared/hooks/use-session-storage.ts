"use client";

import { useCallback } from "react";

type UseSessionStorageProps = {
  key: string;
};

export const useSessionStorage = <T>({ key }: UseSessionStorageProps) => {
  const getItems = useCallback((): T | null => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const stored = sessionStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : null;
    } catch {
      return null;
    }
  }, [key]);

  const setItems = useCallback(
    (value: T) => {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    [key],
  );

  const removeItems = useCallback(() => {
    sessionStorage.removeItem(key);
  }, [key]);

  return {
    getItems,
    setItems,
    removeItems,
  };
};
