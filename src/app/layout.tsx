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
    title: settings?.titleHome || settings?.siteName || "SPMB DKN",
    description: settings?.institutionSynopsis || "Sistem Penerimaan Mahasiswa Baru",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rawSettings = await prisma.webSetting.findFirst();
  const settings = rawSettings ? {
    siteName: rawSettings.siteName,
    shortName: rawSettings.shortName,
    titleDashboard: rawSettings.titleDashboard,
    paymentBank: rawSettings.paymentBank,
    paymentAccount: rawSettings.paymentAccount,
    paymentName: rawSettings.paymentName,
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
