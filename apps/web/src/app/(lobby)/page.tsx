'use client';
import { trpc } from "@web/src/app/trpc";
import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Home() {

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    trpc.hello
      .query({ name: "Felipe" })
      .then(({ greeting }) => setGreeting(greeting));
  }, []);

  return (
    <section className="flex flex-col h-screen justify-center items-center gap-4 overflow-hidden">

      <div>{greeting}</div>

      <Button onClick={() => console.log("hello")}>
        Iniciar sesión
      </Button>

    </section>
  )
}
