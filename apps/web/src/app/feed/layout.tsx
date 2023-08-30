"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink } from "@trpc/client";

import { useStore } from "@/lib/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BottomBarNav } from "@/components/bottombar-nav";
import { SidebarNav } from "@/components/sidebar-nav";
import { SiteHeader } from "@/components/site-header";
import { trpc } from "@/app/trpc";

interface PostsLayoutProps {
  children: React.ReactNode;
}

export default function PostsLayout({ children }: PostsLayoutProps) {
  const { user } = useAuth();
  const setRole = useStore((state) => state.setRole);

  if (!user) {
    redirect("/iniciar-sesion");
  }

  useEffect(() => {
    fetchUserRole();
  }, []);

  async function fetchUserRole() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/role?email=${user?.email}`
      );
      const result = await response.json();

      if (result.success) {
        setRole(result.role);
      }
    } catch (error) {
      console.log(error);
    }
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
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
              <ScrollArea className="relative h-full py-6 pr-6 lg:py-8">
                <SidebarNav className="p-1" />
              </ScrollArea>
            </aside>
            <main className="flex w-full flex-col">{children}</main>
          </div>
          <BottomBarNav />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
