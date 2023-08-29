import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shell } from "@/components/shell"
import { SignInForm } from "@/components/signin-form"

export default function SignInPage() {
  return (
    <Shell layout="auth" className="mx-auto max-w-md">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">Inicia sesión</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
          <SignInForm />
          {/* <Button variant={"outline"}><Icons.google className="mr-2 h-4 w-4" /> Iniciar con Google</Button> */}
        </CardContent>
        <CardFooter className="grid gap-4 text-center">
          <div className="text-muted-foreground flex-1 text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              aria-label="Registro"
              href="/registro"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Regístrate
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
