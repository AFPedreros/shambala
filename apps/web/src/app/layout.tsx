import "@/styles/globals.css"
import { fontMono, fontSans, fontHeading } from "@/lib/fonts";
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from "@/config/site";
import { cn } from '@/lib/utils';
import { AuthContextProvider } from "@/components/useAuth";


export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable, fontMono.variable, fontHeading.variable)}>

        <AuthContextProvider>{children}</AuthContextProvider>
        <TailwindIndicator />
        <Toaster />
      </body>
    </html>
  )
}
