'use client';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import type { z } from 'zod';
import { authSchema } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { PasswordInput } from '@/components/password-input';
import { useAuth } from "@/components/useAuth";
import { trpc } from '@web/src/app/trpc';
import { useState } from 'react';

type Inputs = z.infer<typeof authSchema>;

export function SignUpForm() {
    const { toast } = useToast();
    const { signUp } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<Inputs>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(data: Inputs) {
        setIsLoading(true);
        try {
            await signUp(data.email, data.password);
            await trpc.createUser.mutate({ email: data.email, role: "regular" })
        } catch (error) {
            const firebaseError = error as { code?: string };
            switch (firebaseError.code) {
                case 'auth/email-already-in-use':
                    toast({ variant: "destructive", title: 'Error', description: 'Este correo ya está registrado' });
                    break;
                default:
                    toast({ variant: "destructive", title: 'Error', description: 'Ocurrió un error al iniciar sesión' });
            }
        } finally {
            setIsLoading(false);
            router.push('/inicio');
        }
    }

    return (
        <Form {...form}>
            <form className="grid gap-4" onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
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
                    {isLoading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}
                    Continuar
                    <span className="sr-only">Continúa para la página de verificación de correo</span>
                </Button>
            </form>
        </Form>
    );
}