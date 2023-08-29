"use client"
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { useAuth } from '@/components/useAuth';
import { Icons } from '@/components/icons';
import { siteConfig } from '@/config/site';

export function SiteHeader() {
    const { user, logout } = useAuth();

    async function handleLogout() {
        try {
            await logout();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <header className="fixed top-0 z-40 w-full border-b bg-background">
            <div className="container flex items-center h-16">
                <div className="flex justify-between items-center flex-1 space-x-4">
                    <Link href="/" className="flex items-center text-lg font-bold tracking-tight left-8 top-8">
                        <Icons.logo className="w-6 h-6 mr-2" aria-hidden="true" />
                        <span className='text-[#1BCC53]'>{siteConfig.name}</span>
                    </Link>
                    <>
                        {user ? (
                            <Button size={"sm"} onClick={handleLogout}>
                                Cerrar sesión
                            </Button>

                        ) : (
                            <Link href="/iniciar-sesion">
                                <div
                                    className={buttonVariants({
                                        size: 'sm',
                                    })}
                                >
                                    Iniciar sesión
                                    <span className="sr-only">Iniciar sesión</span>
                                </div>
                            </Link>
                        )}
                    </>
                </div>
            </div>
        </header>
    );
}