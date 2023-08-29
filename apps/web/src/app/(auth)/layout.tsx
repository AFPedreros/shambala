"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { trpc } from "@web/src/app/trpc"

import { siteConfig } from "@/config/site"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Icons } from "@/components/icons"

interface AuthLayoutProps {
  children: React.ReactNode
  showHeader: boolean
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/trpc`,
        }),
      ],
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <main className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
          <AspectRatio ratio={16 / 9}>
            <Image
              src="/daniel-angele-Joo3UBw789Q-unsplash.jpg"
              alt="Montaña"
              priority
              fill
              className="absolute inset-0 object-cover"
            />
            <div className="from-foreground/0 to-foreground/25 md:to-background/50 absolute inset-0 bg-gradient-to-t" />
            <Link
              href="/"
              className="absolute left-8 top-8 z-20 flex items-center text-lg font-bold tracking-tight"
            >
              <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
              <span className="text-[#1BCC53]">{siteConfig.name}</span>
            </Link>
          </AspectRatio>
          <div className="container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
            {children}
          </div>
        </main>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
