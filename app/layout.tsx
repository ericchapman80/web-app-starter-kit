import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Web App Starter", description: "Reusable production web application foundation" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
