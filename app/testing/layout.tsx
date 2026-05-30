import { Playfair_Display } from "next/font/google";
import { ReactNode } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export default function TestingLayout({ children }: { children: ReactNode }) {
  return <div className={playfair.variable}>{children}</div>;
}
