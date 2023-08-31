"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { DialogPost } from "./dialog-post";

export function BottomBarNav() {
  return (
    <div className="bg-background fixed bottom-0 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-b shadow-xl md:hidden">
      <div className="container flex items-center justify-evenly gap-2 py-2">
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          <Icons.home className="mr-2 h-4 w-4" aria-hidden="true" />
          <span className="text-primary">Inicio</span>
        </Link>
        <DialogPost />
      </div>
    </div>
  );
}
