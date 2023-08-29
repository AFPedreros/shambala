import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Icons } from '@/components/icons';

interface AuthLayoutProps {
    children: React.ReactNode;
    showHeader: boolean;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
            <AspectRatio ratio={16 / 9}>
                <Image
                    src="/daniel-angele-Joo3UBw789Q-unsplash.jpg"
                    alt="Montaña"
                    priority
                    fill
                    className="absolute inset-0 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/0 to-foreground/25 md:to-background/50" />
                <Link href="/" className="absolute z-20 flex items-center text-lg font-bold tracking-tight left-8 top-8">
                    <Icons.logo className="w-6 h-6 mr-2" aria-hidden="true" />
                    <span className='text-[#1BCC53]'>{siteConfig.name}</span>
                </Link>
            </AspectRatio>
            <div className="container absolute flex items-center col-span-1 -translate-y-1/2 top-1/2 md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">{children}</div>
        </main>
    );
}