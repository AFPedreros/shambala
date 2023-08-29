"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { DialogPost } from "./dialog-post"

export interface SidebarNavItem {
  icon?: keyof typeof Icons
  href?: string
  title: string
  external?: boolean
  disabled?: boolean
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string
}

export function SidebarNav({ className }: SidebarNavProps) {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <Link href="/" className={buttonVariants({ variant: "ghost" })}>
        <Icons.home className="mr-2 h-4 w-4" aria-hidden="true" />
        <span className="text-primary">Inicio</span>
      </Link>
      <DialogPost />
    </div>
  )
}
