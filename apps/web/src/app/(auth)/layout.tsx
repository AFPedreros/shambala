"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@web/src/app/trpc";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Icons } from "@/components/icons";
import { redirect } from "next/navigation"
import { useAuth } from "@/components/useAuth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  showHeader: boolean;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user } = useAuth();

  if (user) {
    redirect("/feed")
  }

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/trpc`,
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <main className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
          <AspectRatio ratio={16 / 9} className="bg-gray-300">
            <Image
              src="/daniel-angele-Joo3UBw789Q-unsplash.jpg"
              alt="Montaña"
              priority
              fill
              unoptimized={true}
              className="absolute inset-0 object-cover"
            />
            <div className="from-foreground/0 to-foreground/25 md:to-background/50 absolute inset-0 bg-gradient-to-t" />
            <Link className={cn("absolute left-8 top-8 z-20 flex items-center backdrop-blur-md", buttonVariants({ variant: "ghost" }))} href="/">
              <Icons.arrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              <p className="font-semibold tracking-wide">Regresar al incio</p>
            </Link>
          </AspectRatio>
          <div className="container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
            {children}
          </div>

        </main>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
