import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Home - Teslo | Shop",
  },
  description: "Una tienda de prductos",
  keywords: "prductos, shop, teslo",
  openGraph: {
    images: ['/products/1549268-00-A_0_2000.jpg']
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="changeScroll">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-no-repeat min-h-screen bg-fixed `}
      >
        {children}
      </body>
    </html>
  );
}
