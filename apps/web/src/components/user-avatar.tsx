'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Icons } from "@/components/icons";
import { useAuth } from "@/components/useAuth";
import { useStore } from "@/lib/store";




export function UserAvatar() {
    const { user, logout } = useAuth();
    const role = useStore((state) => state.role);

    function getInitials(name: string | null | undefined) {
        if (!name) {
            return '';
        }
        const words = name.split(' ');
        let initials = '';

        for (let i = 0; i < words.length && initials.length < 2; i++) {
            const word = words[i];
            if (word.length > 0) {
                initials += word[0].toUpperCase();
            }
        }

        return initials;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                    <Avatar className="w-9 h-9">
                        <AvatarFallback className='bg-primary text-primary-foreground'>{getInitials(user?.email)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-screen md:w-56 bg-background" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col justify-center h-12 space-y-1 md:h-8">
                        <p className="text-sm font-medium leading-none">{user?.email}</p>
                        {role === "admin" ? <p className="text-xs leading-none text-muted-foreground">{role}</p> : null}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={async () => {
                        try {
                            await logout();
                        } catch (err) {
                            console.log(err);
                        }
                    }}
                    className="h-12 md:h-8 flex items-center"
                >
                    <Icons.exit className="w-4 h-4 mr-2" />
                    <p>Cerrar sesión</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}