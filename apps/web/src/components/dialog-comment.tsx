"use client";

import { useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { trpc } from "@web/src/app/trpc";

import { useToast } from "@/hooks/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import { useAuth } from "@/components/useAuth";

interface DialogCommentProps {
  postId: string;
  comments: number;
}

export function DialogComment({ postId, comments }: DialogCommentProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mutation = trpc.addCommentToPost.useMutation({
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });

  async function onSubmit() {
    const content = contentRef.current?.value;
    if (!content || !user) return;

    setIsLoading(true);
    try {
      mutation.mutate({ postId, email: user?.email || "", content });
      if (contentRef.current) contentRef.current.value = "";
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al crear el comentario",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Icons.comment className="mr-1" aria-hidden="true" />
          {comments}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader></DialogHeader>
        <Textarea
          className="h-[150px]"
          placeholder="Escribe tu mensaje."
          ref={contentRef}
        />
        <DialogFooter>
          <DialogPrimitive.Close
            className={buttonVariants()}
            onClick={onSubmit}
          >
            {mutation.isLoading && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Comentar
          </DialogPrimitive.Close>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
