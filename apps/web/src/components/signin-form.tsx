"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { authSchema } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"
import { useAuth } from "@/components/useAuth"

type Inputs = z.infer<typeof authSchema>

export function SignInForm() {
  const { toast } = useToast()
  const { signIn } = useAuth()
  const { setRole } = useStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: Inputs) {
    setIsLoading(true)
    try {
      await signIn(data.email, data.password)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/role?email=${data.email}`
      )
      const result = await response.json()
      console.log(result)

      if (result.success) {
        setRole(result.role)
      }

      await new Promise((resolve) => setTimeout(resolve, 250))
    } catch (error) {
      const firebaseError = error as { code?: string }
      switch (firebaseError.code) {
        case "auth/wrong-password":
          toast({
            variant: "destructive",
            title: "Error",
            description: "Contraseña incorrecta",
          })
          break
        case "auth/user-not-found":
          toast({
            variant: "destructive",
            title: "Error",
            description: "No se encontró un usuario con ese correo electrónico",
          })
          break
        default:
          toast({
            variant: "destructive",
            title: "Error",
            description: "Ocurrió un error al iniciar sesión",
          })
      }
    } finally {
      setIsLoading(false)
      router.push("/Feed")
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input placeholder="correo@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Iniciar sesión
          <span className="sr-only">Iniciar sesión</span>
        </Button>
      </form>
    </Form>
  )
}
