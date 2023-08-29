"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-4 overflow-hidden">
      <Link className={buttonVariants({ variant: "outline" })} href="/feed">
        Ver posts
      </Link>
    </section>
  );
}
