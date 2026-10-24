import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catalogue Studio · Atelier AI Lab",
  description:
    "Computational commercial photography for Indian jewellers, bespoke footwear shoemakers, and heritage optical boutiques.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#FAF8F5] text-[#1F1C18] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
