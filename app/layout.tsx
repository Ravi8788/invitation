import type { Viewport } from "next";
import type { Metadata } from "next";
import { Cinzel, Poppins, Great_Vibes } from "next/font/google";
import { WEDDING } from "@/lib/constants";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  preload: true,
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  preload: true,
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  preload: true,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sonal-avishkar.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f1529",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: WEDDING.metadata.title,
    template: `%s | ${WEDDING.couple.bride} & ${WEDDING.couple.groom}`,
  },
  description: WEDDING.metadata.description,
  keywords: [
    "engagement invitation",
    "Sonal Avishkar engagement",
    "Satara engagement",
    "Lakeview Hotel Satara",
    "Indian engagement ceremony",
  ],
  authors: [{ name: `${WEDDING.couple.bride} & ${WEDDING.couple.groom}` }],
  creator: `${WEDDING.couple.bride} & ${WEDDING.couple.groom}`,
  openGraph: {
    title: WEDDING.metadata.title,
    description: WEDDING.metadata.description,
    url: siteUrl,
    siteName: WEDDING.metadata.title,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sonal & Avishkar Engagement Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: WEDDING.metadata.title,
    description: WEDDING.metadata.description,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        cinzel.variable,
        poppins.variable,
        greatVibes.variable
      )}
    >
      <head>
        <link rel="preload" href="/videos/background.mp4" as="video" type="video/mp4" />
      </head>
      <body className="min-h-full font-body bg-twilight text-ivory">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
