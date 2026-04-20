/* ============================================================
   ROOT LAYOUT — /app/layout.tsx
   ============================================================
   FONTS:
     Loading Montserrat from Google Fonts.
     Weights loaded: 400, 500, 600, 700, 800, 900
     (Use 900/Black for hero headline, 700 for titles,
      600 for buttons/nav, 400/500 for body text)
   
   PAGE BG:
     Default body bg: #0d0d1a (very dark navy/purple-black)
     This is the base color visible between sections
   ============================================================ */

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

/* -------------------------------------------------------
   FONT CONFIG
   Using Next.js built-in font optimization
   ------------------------------------------------------- */
const montserrat = Montserrat({
  subsets: ["latin"],
  /* Weights used across the site — add/remove as needed */
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMB Axis — Powering Real Estate Through Technology",
  description:
    "Structured systems that bring clarity, control, and scale to Real Estate operations.",
  /* 
    REPLACE with actual values from your brand:
    openGraph: {
      images: [{ url: "/images/og-image.png" }],
    },
  */
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body
        style={{
          /* -------------------------------------------------------
             BODY BACKGROUND
             Base page color: #0d0d1a
             Font family: Montserrat (loaded via next/font)
             ------------------------------------------------------- */
          backgroundColor: "#0d0d1a",
          fontFamily: "var(--font-montserrat), sans-serif",
          margin: 0,
          padding: 0,
          overflowX: "hidden",
        }}
      >
        {/* Fixed Navbar sits above all content */}
        <Navbar />

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}
