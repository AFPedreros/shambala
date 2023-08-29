"use client"

import { useEffect, useState } from "react"
import { trpc } from "@web/src/app/trpc"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Toggle } from "@/components/ui/toggle"
import { PostCommentCard } from "@/components/comment-card"
import { DialogComment } from "@/components/dialog-comment"
import { Icons } from "@/components/icons"
import { useAuth } from "@/components/useAuth"

interface Comment {
  _id: string
  email: string
  content: string
  createdAt: Date
}

interface Post {
  _id: string
  email: string
  content: string
  likedBy: string[]
  comments: Comment[]
}

export function PostCard(
  {
    _id,
    email,
    content,
    likedBy,
    comments,
    onPostDeleted,
    userEmail,
  }: Post & { onPostDeleted: (postId: string) => void; userEmail: string }
) {
  const { toast } = useToast()
  const [role, setRole] = useState("")
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [likes, setLikes] = useState(likedBy.length)
  const [hasLiked, setHasLiked] = useState(likedBy.includes(userEmail))
  const mutationLikePost = trpc.likePost.useMutation()
  const mutationDeletePost = trpc.deletePost.useMutation()
  const mutationDeleteComment = trpc.deleteComment.useMutation()
  const mutationUnlikePost = trpc.unlikePost.useMutation()

  useEffect(() => {
    fetchUser()
  }, [])

  async function fetchUser() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/role?email=${user?.email}`
      )
      const result = await response.json()

      if (result.success) {
        setRole(result.role)
      }

      await new Promise((resolve) => setTimeout(resolve, 250))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      //   const response = await trpc.deletePost.mutate({ _id })
      mutationDeletePost.mutate({ _id })
      if (mutationDeletePost.isSuccess) {
        toast({ title: "Post eliminado" })
        onPostDeleted(_id)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo eliminar el post",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al eliminar el post",
      })
    }
  }

  async function handleLike() {
    try {
      if (hasLiked) {
        // const response = await trpc.unlikePost.mutate({ _id, userEmail })
        mutationUnlikePost.mutate({ _id, userEmail })
        if (mutationDeleteComment.isSuccess) {
          setLikes((prevLikes) => prevLikes - 1)
          setHasLiked(false)
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "No se pudo quitar el like al post",
          })
        }
      } else {
        // const response = await trpc.likePost.mutate({ _id, userEmail })
        mutationLikePost.mutate({ _id, userEmail })
        if (mutationLikePost.isSuccess) {
          setLikes((prevLikes) => prevLikes + 1)
          setHasLiked(true)
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "No se pudo dar like al post",
          })
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al actualizar el like",
      })
    }
  }

  async function handleCommentDeleted(commentId: string) {
    try {
      //   const response = await trpc.deleteComment.mutate({
      //     postId: _id,
      //     commentId,
      //   })
      mutationDeleteComment.mutate({ postId: _id, commentId })
      if (mutationDeleteComment.isSuccess) {
        toast({ title: "Comentario eliminado" })
      } else {
        const deletedComment = comments.find(
          (comment) => comment._id === commentId
        )
        if (deletedComment) {
        }
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo eliminar el comentario",
        })
      }
    } catch (error) {
      console.error("Error deleting comment:", error)
      const deletedComment = comments.find(
        (comment) => comment._id === commentId
      )
      if (deletedComment) {
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al eliminar el comentario",
      })
    }
  }

  // console.log(role)
  return (
    <Card className="w-full sm:w-[550px]">
      <CardHeader className="relative">
        <CardTitle>{email}</CardTitle>
        {role === "admin" ? (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="absolute right-0 top-0 cursor-pointer"
            onClick={handleDelete}
          >
            <Icons.trash
              className="text-destructive h-4 w-4"
              aria-hidden="true"
            />
          </Button>
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
                <Icons.heart className="mr-1" aria-hidden="true" />
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
