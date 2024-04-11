import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./nprogress-custom.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Insights from "@/components/Insights";

export const metadata: Metadata = {
  title: {
    template: "%s | Sunroomy",
    default: "Sunroomy",
  },
  metadataBase: new URL("https://sunroomy.com"),
  generator: "Next.js",
  openGraph: {
    title: "Sunroomy",
    description: "Elevate your living experience with sunroomy ☀️🌿",
    siteName: "Sunroomy",
    type: "website",
    locale: "en-US",
    images: {
      url: "https://sunroomy.com/og-preview.png",
    },
  },
  icons: {
    icon: [
      {
        url: "/images/logom3.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/logom1.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  applicationName: "Sunroomy",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Sunroomy",
    "Sunrooms",
    "Pergolas",
  ],
  authors: [{ name: "Sunroomy" }],
  creator: "nartech.az",
  publisher: "NarTech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  description: "The Next Generation of Design and Craft",
};
export const SanFrancisco = localFont({
  src: [
    {
      path: "./fonts/SFUIDisplay-Ultralight.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sf",
});

export const Helvetica = localFont({
  src: [
    {
      path: "./fonts/HelveticaNowDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNowDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${Helvetica.variable} ${SanFrancisco.variable}`}>
        {/* <ProgressBar /> */}
        <main className="relative !z-20">{children}</main>
        <Insights />
      </body>
    </html>
  );
}
