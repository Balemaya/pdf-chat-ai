import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/components/provider";
import TRPCProvider from "./api/_trpc/Provider";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <Provider>
           <TRPCProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative container flex min-h-screen flex-col">
   <SiteHeader />
      <div className="flex flex-1 py-4">
              {children}
              </div>
              </div>
            </ThemeProvider>
            </TRPCProvider> 
          </Provider>
        </body>
      </html>
    </>
  );
}
