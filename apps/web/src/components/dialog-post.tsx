"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from '@/components/icons';
import { useAuth } from '@/components/useAuth';
import { trpc } from '@web/src/app/trpc';
import { useToast } from '@/hooks/use-toast';
import { useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog"

export function DialogPost() {
    const { user } = useAuth()
    const { toast } = useToast();
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit() {
        const content = contentRef.current?.value;
        if (!content || !user) return;

        setIsLoading(true)
        try {
            await trpc.createPost.mutate({ email: user?.email || "", content })
            if (contentRef.current) contentRef.current.value = '';
        } catch (error) {
            console.log(error)
            toast({ variant: "destructive", title: 'Error', description: 'Ocurrió un error al crear el post' });

        } finally {
            setIsLoading(false)
        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Postear</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                </DialogHeader>
                <Textarea className="h-[150px]" placeholder="Escribe tu mensaje." ref={contentRef} />
                <DialogFooter>
                    <DialogPrimitive.Close className={buttonVariants()} onClick={onSubmit}>
                        {isLoading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}
                        Postear
                    </DialogPrimitive.Close>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
