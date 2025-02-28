"use client";

import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return <html lang="en" data-theme="light">
    <body>{children}</body>
  </html>;
}
