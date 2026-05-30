import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/TopNav";

export const metadata: Metadata = {
  title: "Market Dashboard",
  description: "Daily snapshot of markets, rates, news, and fuel prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-white">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
