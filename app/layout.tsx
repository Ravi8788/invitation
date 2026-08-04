import type { Viewport } from "next";
import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Montserrat, Noto_Serif_Devanagari } from "next/font/google";
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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600"],
  preload: true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  preload: true,
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  display: "swap",
  weight: ["400", "600", "700"],
  preload: true,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://invitation-ashen-phi.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: WEDDING.metadata.title,
    template: `%s | ${WEDDING.couple.bride} आणि ${WEDDING.couple.groom}`,
  },
  description: WEDDING.metadata.description,
  keywords: [
    "सुपारी सुकरपुडा",
    "मराठी निमंत्रण",
    "Maharashtrian wedding invitation",
    "Satara",
    "Lakeview Hotel",
  ],
  openGraph: {
    title: WEDDING.metadata.title,
    description: WEDDING.metadata.description,
    url: siteUrl,
    siteName: WEDDING.metadata.title,
    type: "website",
    locale: "mr_IN",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: WEDDING.metadata.title,
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
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="mr"
      className={cn(
        "h-full antialiased",
        cinzel.variable,
        montserrat.variable,
        cormorant.variable,
        notoDevanagari.variable,
      )}
    >
      <head>
        <link rel="preload" href="/images/ganesha.png" as="image" />
        <link rel="preload" href="/videos/hero-frames/frame-0001.webp" as="image" />
      </head>
      <body className="min-h-full overflow-x-hidden bg-onyx-dark font-body text-white select-none">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
