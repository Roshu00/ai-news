"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useSearchParamsState = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      const query = params.toString();
      router.push(`?${query}`);
    },
    [router, searchParams]
  );

  const clearParams = useCallback(() => {
    router.push(window.location.pathname);
  }, [router]);

  return { getParam, setParam, clearParams };
};
