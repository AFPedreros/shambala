import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex h-screen bg-gradient-to-bl from-[#6C7C67]/5 via-[#6C7C67]/25 to-[#6C7C67]/50 flex-col items-center justify-center gap-4 overflow-hidden">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Conecta, Comparte, Transforma
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/50">
              Únete a una comunidad comprometida con el cambio ambiental. Descubre, interactúa y contribuye con posts que redefinen los valores de nuestra sociedad.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link className={buttonVariants({ size: "lg" })} href="/feed">
                Ver posts
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
