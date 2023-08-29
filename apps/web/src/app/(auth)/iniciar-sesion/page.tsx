import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SignInForm } from '@/components/signin-form';
import { Shell } from '@/components/shell';

export default function SignInPage() {
    return (
        <Shell layout="auth" className='max-w-md mx-auto'>
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">Inicia sesión</CardTitle>
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
                    <div className="flex-1 text-sm text-muted-foreground">
                        ¿No tienes una cuenta?{' '}
                        <Link aria-label="Registro" href="/registro" className="transition-colors text-primary underline-offset-4 hover:underline">
                            Regístrate
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </Shell>
    );
}