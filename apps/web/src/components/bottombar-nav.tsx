"use client"
import { Icons } from "@/components/icons"
import { buttonVariants } from '@/components/ui/button';
import Link from "next/link";
import { DialogPost } from "./dialog-post";

export function BottomBarNav() {

  return (
    <div className="fixed md:hidden bottom-0 z-40 w-full border-b bg-background" >
      <div className="container px-16 flex justify-between items-center h-16">
      <Link href="/" className={buttonVariants({ variant: "ghost" })}>
        <Icons.home className="w-4 h-4 mr-2" aria-hidden="true" />
        <span className='text-primary'>Inicio</span>
      </Link>
      <DialogPost />
    </div>
    </div>
  )
}