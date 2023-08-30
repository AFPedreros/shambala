"use client";

import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useAuth } from "@/components/useAuth";
import { UserAvatar } from "@/components/user-avatar"

export function SiteHeader() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="bg-background fixed top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center">
        <div className="flex flex-1 items-center justify-between space-x-4">
          <Link
            href="/"
            className="left-8 top-8 flex items-center text-lg font-bold tracking-tight"
          >
            <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
            <span className="text-[#1BCC53]">{siteConfig.name}</span>
          </Link>
          <>
            {user ? (
              // <Button size={"sm"} onClick={handleLogout}>
              //   Cerrar sesión
              // </Button>
              <UserAvatar />
            ) : (
              <Link href="/iniciar-sesion">
                <div
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Iniciar sesión
                  <span className="sr-only">Iniciar sesión</span>
                </div>
              </Link>
            )}
          </>
        </div>
      </div>
    </header>
  );
}
