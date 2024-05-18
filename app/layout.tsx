import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LayerZero Sybil Hunter",
  description: "Find out if your address is Sybil or not.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
