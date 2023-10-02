import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/components/provider";
import TRPCProvider from "./api/_trpc/Provider";
import { SiteHeader } from "@/components/site-header";
import dynamic from 'next/dynamic'
import { Toaster } from "@/components/ui/toaster";
import { cn, constructMetadata } from "@/lib/utils";


const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata()

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {

  const CrispWithNoSSR = dynamic(
    () => import('../components/crisp')
  )

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen font-sans antialiased grainy',
            inter.className
          )}>
        <CrispWithNoSSR />
          <Provider>
           <TRPCProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex-col">
   <SiteHeader />
      <div className="flex flex-1">
              {children}
              </div>
              </div>
              <Toaster />
            </ThemeProvider>
            </TRPCProvider> 
          </Provider>
        </body>
      </html>
    </>
  );
}
