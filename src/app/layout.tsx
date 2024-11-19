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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="changeScroll">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-no-repeat min-h-screen bg-fixed `} /* IGUAL ESTO DE BG FIXED HAY QUE QUITARLO */
      >
        {children}
      </body>
    </html>
  );
}
