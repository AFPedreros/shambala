"use client";

import { useStore } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { useAuth } from "@/components/useAuth";

export function UserAvatar() {
  const { user, logout } = useAuth();
  const role = useStore((state) => state.role);

  function getInitials(name: string | null | undefined) {
    if (!name) {
      return "";
    }
    const words = name.split(" ");
    let initials = "";

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
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user?.email)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-background w-fit"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex h-12 flex-col justify-center space-y-1 md:h-8">
            <p className="text-sm font-medium leading-none">{user?.email}</p>
            {role === "admin" ? (
              <p className="text-muted-foreground text-xs leading-none">
                {role}
              </p>
            ) : null}
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
          className="flex h-12 items-center md:h-8"
        >
          <Icons.exit className="mr-2 h-4 w-4" />
          <p>Cerrar sesión</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
