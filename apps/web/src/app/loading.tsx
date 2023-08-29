'use client';
import { Icons } from '@/components/icons';

export default function loading() {
    return (
        <div className="relative flex w-screen justify-center items-center min-h-screen">
            <Icons.loader className="w-12 h-12 text-black animate-spin" />
        </div>
    );
}