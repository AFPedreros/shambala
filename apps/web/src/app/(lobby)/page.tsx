'use client';
import { trpc } from "@web/src/app/trpc";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    trpc.hello
      .query({ name: "Andrés" })
      .then(({ greeting }) => setGreeting(greeting));
  }, []);

  return (
    <section className="flex flex-col h-screen justify-center items-center gap-4 overflow-hidden">
      <div>{greeting}</div>
      <Link className={buttonVariants({ variant: "outline" })} href="/inicio" >
        Ver posts
      </Link>
    </section>
  )
}
