"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { heroItemVariants, heroVariants } from "@/lib/anim";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-to-bl from-[#6C7C67]/5 via-[#6C7C67]/25 to-[#6C7C67]/50">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>

          <motion.div
            className="text-center"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-foreground text-4xl font-bold tracking-tight sm:text-6xl"
              variants={heroItemVariants}
            >
              Conecta, Comparte, Transforma
            </motion.h1>
            <motion.p
              className="text-foreground/50 mt-6 text-lg leading-8"
              variants={heroItemVariants}
            >
              Únete a una comunidad comprometida con el cambio ambiental.
              Descubre, interactúa y contribuye con posts que redefinen los
              valores de nuestra sociedad.
            </motion.p>
            <div>
              <motion.div className="mt-10" variants={heroItemVariants}>
                <Link className={buttonVariants({ size: "lg" })} href="/feed">
                  Ver posts
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
