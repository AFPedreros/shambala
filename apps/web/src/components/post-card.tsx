"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { Icons } from "@/components/icons"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { PostCommentCard } from "@/components/comment-card"
import { DialogComment } from "@/components/dialog-comment"
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from "react"
import { trpc } from '@web/src/app/trpc';
import { useAuth } from "@/components/useAuth";

interface Comment {
    _id: string;
    email: string;
    content: string;
    createdAt: Date;
}

interface Post {
    _id: string;
    email: string;
    content: string;
    likedBy: string[];
    comments: Comment[];
}


export function PostCard({ _id, email, content, likedBy, comments, onPostDeleted, userEmail }: Post & { onPostDeleted: (postId: string) => void, userEmail: string }) {
    const { toast } = useToast();
    const [role, setRole] = useState("")
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [likes, setLikes] = useState(likedBy.length);
    const [hasLiked, setHasLiked] = useState(likedBy.includes(userEmail));

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

    const handleDelete = async () => {
        try {
            const response = await trpc.deletePost.mutate({ _id });
            if (response.success) {
                toast({ title: 'Post eliminado', description: response.message });
                onPostDeleted(_id);
            } else {
                toast({ variant: "destructive", title: 'Error', description: 'No se pudo eliminar el post' });
            }
        } catch (error) {
            toast({ variant: "destructive", title: 'Error', description: 'Ocurrió un error al eliminar el post' });
        }
    };

    async function handleLike() {
        try {
            if (hasLiked) {
                const response = await trpc.unlikePost.mutate({ _id, userEmail });
                if (response.success) {
                    setLikes(prevLikes => prevLikes - 1);
                    setHasLiked(false);
                } else {
                    toast({ variant: "destructive", title: 'Error', description: 'No se pudo quitar el like al post' });
                }
            } else {
                const response = await trpc.likePost.mutate({ _id, userEmail });
                if (response.success) {
                    setLikes(prevLikes => prevLikes + 1);
                    setHasLiked(true);
                } else {
                    toast({ variant: "destructive", title: 'Error', description: 'No se pudo dar like al post' });
                }
            }
        } catch (error) {
            toast({ variant: "destructive", title: 'Error', description: 'Ocurrió un error al actualizar el like' });
        }
    }

    async function handleCommentDeleted(commentId: string) {

        try {
            const response = await trpc.deleteComment.mutate({ postId: _id, commentId });
            if (response.success) {
                toast({ title: 'Comentario eliminado', description: response.message });
            } else {
                const deletedComment = comments.find(comment => comment._id === commentId);
                if (deletedComment) {
                }
                toast({ variant: "destructive", title: 'Error', description: 'No se pudo eliminar el comentario' });
            }
        } catch (error) {
            console.error("Error deleting comment:", error)
            const deletedComment = comments.find(comment => comment._id === commentId);
            if (deletedComment) {
            }
            toast({ variant: "destructive", title: 'Error', description: 'Ocurrió un error al eliminar el comentario' });
        }
    }

    // console.log(role)
    return (
        <Card className="sm:w-[550px] w-full">
            <CardHeader className="relative">
                <CardTitle>{email}</CardTitle>
                {role === "admin" ? <Button variant={"ghost"} size={"icon"} className="absolute cursor-pointer top-0 right-0" onClick={handleDelete}>
                    <Icons.trash className="text-destructive w-4 h-4" aria-hidden="true" />
                </Button> : null}
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
            <CardFooter className="flex items-start flex-col">
                <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="space-y-2 w-full"
                >
                    <div className="flex w-full items-center justify-between">
                        <div className="flex gap-1">
                            <Toggle aria-label="Toggle italic" onClick={handleLike} isActive={hasLiked}>
                                <Icons.heart className="mr-1" aria-hidden="true" />
                                {likes}
                            </Toggle>
                            <DialogComment comments={comments.length} postId={_id} />
                        </div>
                        {comments.length > 0 ? <CollapsibleTrigger asChild>
                            <div className="flex w-fit items-center justify-between gap-1">
                                <h4 className="text-sm hidden sm:block cursor-pointer font-semibold">
                                    Ver comentarios
                                </h4>
                                <Button variant="ghost" size="sm">
                                    <Icons.view className="h-4 w-4" />
                                    <span className="sr-only">Toggle</span>
                                </Button>
                            </div>
                        </CollapsibleTrigger> : <p className="text-border text-sm">No hay comentarios</p>}
                    </div>
                    <CollapsibleContent className="space-y-2">
                        {comments.map((comment) => (
                            <PostCommentCard
                                key={comment._id}
                                email={comment.email}
                                content={comment.content}
                                date={comment.createdAt}
                                _id={comment._id}
                                onCommentDeleted={() => handleCommentDeleted(comment._id)}
                            />
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            </CardFooter>
        </Card>
    )
}
