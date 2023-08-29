import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SignUpForm } from "@/components/signup-form";
import { Shell } from "@/components/shell";

export default function SignUpPage() {
    return (
        <Shell layout="auth" className='max-w-md mx-auto'>
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">Regístrate</CardTitle>
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
                    <div className="text-sm text-muted-foreground">
                        ¿Ya tienes una cuenta?{' '}
                        <Link aria-label="Iniciar sesión" href="/iniciar-sesion" className="transition-colors text-primary underline-offset-4 hover:underline">
                            Inicia sesión
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </Shell>
    );
}