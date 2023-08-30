"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { useStore } from "@/lib/store";

interface Comment {
  _id: string;
  email: string;
  content: string;
  date: Date;
}

export function PostCommentCard({
  email,
  content,
  _id,
  onCommentDeleted,
}: Comment & { onCommentDeleted: (postId: string) => void }) {
  const role = useStore((state) => state.role);

  return (
    <Card className="w-full">
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
                <AlertDialogTitle>¿Estás seguro que quieres borrar este comentario?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => onCommentDeleted(_id)}>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
