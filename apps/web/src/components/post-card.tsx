"use client";

import { useState } from "react";
import { Post } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

import { commentsContainerVariants, commentVariants } from "@/lib/anim";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Toggle } from "@/components/ui/toggle";
import { PostCommentCard } from "@/components/comment-card";
import { DialogComment } from "@/components/dialog-comment";
import { Icons } from "@/components/icons";
import { trpc } from "@/app/trpc";

export function PostCard({
  _id,
  email,
  content,
  likedBy,
  comments,
  userEmail,
}: Post & { userEmail: string }) {
  const { toast } = useToast();
  const role = useStore((state) => state.role);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [likes, setLikes] = useState(likedBy.length);
  const [hasLiked, setHasLiked] = useState(likedBy.includes(userEmail));

  const mutationLikePost = trpc.likePost.useMutation({
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });

  const mutationDeletePost = trpc.deletePost.useMutation({
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });

  const mutationDeleteComment = trpc.deleteComment.useMutation({
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });

  const mutationUnlikePost = trpc.unlikePost.useMutation({
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });

  async function handleDelete() {
    try {
      mutationDeletePost.mutate({ _id });
      toast({ title: "Post eliminado correctamente" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al eliminar el post",
      });
    }
  }

  async function handleLike() {
    try {
      if (hasLiked) {
        mutationUnlikePost.mutate({ _id, userEmail });
        setLikes((prevLikes) => prevLikes - 1);
        setHasLiked(false);
      } else {
        mutationLikePost.mutate({ _id, userEmail });
        setLikes((prevLikes) => prevLikes + 1);
        setHasLiked(true);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al actualizar el like",
      });
    }
  }

  async function handleCommentDeleted(commentId: string) {
    try {
      mutationDeleteComment.mutate({ postId: _id, commentId });
      toast({ title: "Comentario eliminado correctamente" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      const deletedComment = comments.find(
        (comment) => comment._id === commentId
      );
      if (deletedComment) {
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al eliminar el comentario",
      });
    }
  }

  return (
    <Card className="w-full sm:w-[550px]">
      <CardHeader className="relative">
        <CardTitle className="tracking-wide">{email}</CardTitle>
        {role === "admin" ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="absolute right-0 top-0 cursor-pointer"
              >
                <Icons.trash
                  className="text-destructive h-4 w-4"
                  aria-hidden="true"
                />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estás seguro que quieres borrar este post?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive hover:bg-destructive/90"
                  onClick={handleDelete}
                >
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-2"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-1">
              <Toggle
                aria-label="Toggle italic"
                onClick={handleLike}
                isActive={hasLiked}
              >
                {hasLiked ? (
                  <Icons.heartFilled className="mr-1" aria-hidden="true" />
                ) : (
                  <Icons.heart className="mr-1" aria-hidden="true" />
                )}
                {likes}
              </Toggle>
              <DialogComment comments={comments.length} postId={_id} />
            </div>
            {comments.length > 0 ? (
              <CollapsibleTrigger asChild>
                <div className="flex w-fit items-center justify-between gap-1">
                  <h4 className="hidden cursor-pointer text-sm font-semibold sm:block">
                    Ver comentarios
                  </h4>
                  <Button variant="ghost" size="sm">
                    <Icons.view className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </div>
              </CollapsibleTrigger>
            ) : (
              <p className="text-border text-sm">No hay comentarios</p>
            )}
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={commentsContainerVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <CollapsibleContent className="space-y-2">
                  {comments.map((comment) => (
                    <motion.div key={comment._id} variants={commentVariants}>
                      <PostCommentCard
                        email={comment.email}
                        content={comment.content}
                        date={comment.date}
                        _id={comment._id}
                        onCommentDeleted={() =>
                          handleCommentDeleted(comment._id)
                        }
                      />
                    </motion.div>
                  ))}
                </CollapsibleContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Collapsible>
      </CardFooter>
    </Card>
  );
}
