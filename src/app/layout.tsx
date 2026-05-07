import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pasang WiFi Murah Bandung | Internet Cepat & Stabil",
    template: "%s | Wifi Murah Bandung",
  },
  description:
    "Pasang WiFi murah di Bandung. Internet cepat, stabil & harga terjangkau. Provider terpercaya: IndiHome, Biznet, MyRepublic, First Media, ICONNET. Konsultasi gratis!",
  keywords: [
    "wifi murah bandung",
    "pasang wifi bandung",
    "internet rumah bandung",
    "wifi terbaik bandung",
    "provider internet bandung",
    "wifi gaming bandung",
    "internet murah bandung",
    "pasang internet bandung",
    "wifi fiber bandung",
    "internet kantor bandung",
    "indhome bandung",
    "biznet bandung",
    "myrepublic bandung",
  ],
  authors: [{ name: "Wifi Murah Bandung" }],
  creator: "Wifi Murah Bandung",
  publisher: "Wifi Murah Bandung",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://wifimurahbandung.web.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pasang WiFi Murah Bandung | Internet Cepat & Stabil",
    description:
      "Pasang WiFi murah di Bandung. Internet cepat, stabil & harga terjangkau. Konsultasi gratis!",
    url: "https://wifimurahbandung.web.id",
    siteName: "Wifi Murah Bandung",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pasang WiFi Murah Bandung | Internet Cepat & Stabil",
    description:
      "Pasang WiFi murah di Bandung. Internet cepat, stabil & harga terjangkau. Konsultasi gratis!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="geo.region" content="ID-JB" />
        <meta name="geo.placename" content="Bandung" />
        <meta name="geo.position" content="-6.9175;107.6191" />
        <meta name="ICBM" content="-6.9175, 107.6191" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
