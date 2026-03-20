import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SettingsProvider } from "@/components/SettingsProvider";
import { prisma } from "@/lib/prisma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.webSetting.findFirst();
  return {
    title: settings?.title_home || settings?.site_name || "SPMB DKN",
    description: settings?.institution_synopsis || "Sistem Penerimaan Mahasiswa Baru",
    icons: {
      icon: settings?.favicon ? `/images/${settings.favicon}` : "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rawSettings = await prisma.webSetting.findFirst();
  const settings = rawSettings ? {
    site_name: rawSettings.site_name,
    short_name: rawSettings.short_name,
    title_dashboard: rawSettings.title_dashboard,
    payment_bank: rawSettings.payment_bank,
    payment_account: rawSettings.payment_account,
    payment_name: rawSettings.payment_name,
  } : {};

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <SettingsProvider settings={settings}>
            {children}
          </SettingsProvider>
        </Providers>
      </body>
    </html>
  );
}
