"use client"

import { Icons } from "@/components/icons"

export default function loading() {
  return (
    <div className="relative flex min-h-screen w-screen items-center justify-center">
      <Icons.loader className="h-12 w-12 animate-spin text-black" />
    </div>
  )
}
