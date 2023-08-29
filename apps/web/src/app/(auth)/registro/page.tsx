import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shell } from "@/components/shell";
import { SignUpForm } from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <Shell layout="auth" className="mx-auto max-w-md">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">Regístrate</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
          <SignUpForm />
          {/* <Button variant={"outline"}><Icons.google className="mr-2 h-4 w-4" /> Regístrate con Google</Button> */}
        </CardContent>
        <CardFooter className="grid gap-4 text-center">
          <div className="text-muted-foreground text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link
              aria-label="Iniciar sesión"
              href="/iniciar-sesion"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Inicia sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  );
}
