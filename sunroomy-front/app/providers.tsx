"use client";
import { Toaster } from "react-hot-toast";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Toaster />
      <SessionProvider>{children}</SessionProvider>
    </NextUIProvider>
  );
}
