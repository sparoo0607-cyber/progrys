import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomBanner } from "@/components/layout/BottomBanner";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const captureIt = localFont({
  src: "../public/fonts/capture-it/Capture_it.ttf",
  variable: "--font-capture",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PROGRYS | The Student Digital Ecosystem",
  description: "Everything a student needs. All in one place. Digital products, roadmaps, blogs, and knowledge hub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${captureIt.variable} antialiased h-full`} suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap" rel="stylesheet" />
        <Script 
          id="Cookiebot" 
          src="https://consent.cookiebot.com/uc.js" 
          data-cbid="181833a5-1bd2-4ea0-be3a-35242cf1b5bd" 
          strategy="beforeInteractive" 
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XGXMKKL4CB" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XGXMKKL4CB');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col relative bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileBottomNav />
          <BottomBanner />
          <Toaster position="bottom-center" toastOptions={{
            style: {
              background: 'var(--card)',
              color: 'var(--foreground)',
              border: '1px solid var(--border-color)',
            }
          }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
