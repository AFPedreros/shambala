import "@/styles/globals.css";

import { AuthContextProvider } from "@/context/AuthContext";

import { siteConfig } from "@/config/site";
import { fontHeading, fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { TailwindIndicator } from "@/components/tailwind-indicator";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontHeading.variable
        )}
      >
        <AuthContextProvider>{children}</AuthContextProvider>
        <TailwindIndicator />
        <Toaster />
      </body>
    </html>
  );
}
