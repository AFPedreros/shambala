"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useState, useEffect } from "react"
import { useAuth } from "@/components/useAuth";

interface Comment {
    _id: string;
    email: string;
    content: string;
    date: Date;
}

export function PostCommentCard({ email, content, _id, onCommentDeleted }: Comment & { onCommentDeleted: (postId: string) => void }) {
    const [role, setRole] = useState("")
    const { user } = useAuth()

    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_SERVER}/role?email=${user?.email}`);
            const result = await response.json();

            if (result.success) {
                setRole(result.role);
            }

            await new Promise(resolve => setTimeout(resolve, 250));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader className="relative">
                <CardTitle>{email}</CardTitle>
                {role === "admin" ? <Button variant={"ghost"} size={"icon"} className="absolute cursor-pointer top-0 right-0" onClick={() => onCommentDeleted(_id)}>
                    <Icons.trash className="w-4 h-4 text-destructive" aria-hidden="true" />
                </Button> : null}
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
        </Card>
    )
}
