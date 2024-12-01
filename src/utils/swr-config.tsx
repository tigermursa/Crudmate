"use client";

import { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true,
        shouldRetryOnError: true,
        dedupingInterval: 2000, // Avoid repeated calls within 2 seconds
      }}
    >
      {children}
    </SWRConfig>
  );
};
