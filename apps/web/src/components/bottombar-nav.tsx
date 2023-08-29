"use client"

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { DialogPost } from "./dialog-post"

export function BottomBarNav() {
  return (
    <div className="bg-background fixed bottom-0 z-40 w-full border-b md:hidden">
      <div className="container flex h-16 items-center justify-between px-16">
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          <Icons.home className="mr-2 h-4 w-4" aria-hidden="true" />
          <span className="text-primary">Feed</span>
        </Link>
        <DialogPost />
      </div>
    </div>
  )
}
