import { INestApplication, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPost } from "@server/models/post.model";
import { IUser } from "@server/models/user.model";
import { TrpcService } from "@server/trpc/trpc.service";
import * as trpcExpress from "@trpc/server/adapters/express";
import { Model } from "mongoose";
import { z } from "zod";

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    @InjectModel("User") private readonly userModel: Model<IUser>,
    @InjectModel("Post") private readonly postModel: Model<IPost>
  ) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        })
      )
      .query(({ input }) => {
        const { name } = input;
        return {
          greeting: `Hello ${name ? name : `Bilbo`}`,
        };
      }),

    createUser: this.trpc.procedure
      .input(
        z.object({
          email: z.string(),
          role: z.enum(["admin", "regular"]),
        })
      )
      .mutation(async ({ input }) => {
        console.log(input);
        const newUser = new this.userModel({
          email: input.email,
          role: input.role,
        });

        try {
          await newUser.save();
          return { success: true, message: "Usuario creado exitosamente" };
        } catch (error) {
          console.error("Error detallado:", error);
          throw new Error("Error al crear el usuario");
        }
      }),

    createPost: this.trpc.procedure
      .input(
        z.object({
          email: z.string(),
          content: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const newPost = new this.postModel({
          email: input.email,
          content: input.content,
          likes: 0,
          comments: [],
        });

        try {
          await newPost.save();
          return { success: true, message: "Post creado exitosamente" };
        } catch (error) {
          console.error("Error detallado:", error);
          throw new Error("Error al crear el post");
        }
      }),

    getPosts: this.trpc.procedure
      .input(
        z.object({
          queryKey: z.string().default("getPosts"),
        })
      )
      .query(async ({ input }) => {
        const posts = await this.postModel.find().exec();
        return posts;
      }),

    deletePost: this.trpc.procedure
      .input(
        z.object({
          _id: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const { _id } = input;
        try {
          await this.postModel.findByIdAndDelete(_id);
          return { success: true, message: "Post eliminado exitosamente" };
        } catch (error) {
          console.error("Error detallado:", error);
          throw new Error("Error al eliminar el post");
        }
      }),

    addCommentToPost: this.trpc.procedure
      .input(
        z.object({
          postId: z.string(),
          email: z.string(),
          content: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const { postId, email, content } = input;
        try {
          await this.postModel.findByIdAndUpdate(postId, {
            $push: { comments: { email, content } },
          });
          return { success: true, message: "Comentario añadido exitosamente" };
        } catch (error) {
          console.error("Error detallado:", error);
          throw new Error("Error al añadir el comentario");
        }
      }),

    deleteComment: this.trpc.procedure
      .input(
        z.object({
          postId: z.string(),
          commentId: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const { postId, commentId } = input;

        try {
          await this.postModel.updateOne(
            { _id: postId },
            {
              $pull: { comments: { _id: commentId } }, // Utiliza el _id del comentario aquí
            }
          );
          return {
            success: true,
            message: "Comentario eliminado exitosamente",
          };
        } catch (error) {
          console.error("Error detallado:", error);
          throw new Error("Error al eliminar el comentario");
        }
      }),

    likePost: this.trpc.procedure
      .input(
        z.object({
          _id: z.string(),
          userEmail: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const { _id, userEmail } = input;
        try {
          await this.postModel.findByIdAndUpdate(_id, {
            $inc: { likes: 1 },
            $push: { likedBy: userEmail },
          });
          return { success: true, message: "Post liked successfully" };
        } catch (error) {
          console.error("Error detallado:", error);
          throw new Error("Error al dar like al post");
        }
      }),

    unlikePost: this.trpc.procedure
      .input(
        z.object({
          _id: z.string(),
          userEmail: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const { _id, userEmail } = input;
        try {
          await this.postModel.findByIdAndUpdate(_id, {
            $inc: { likes: -1 },
            $pull: { likedBy: userEmail },
          });
          return { success: true, message: "Post unliked successfully" };
        } catch (error) {
          console.error("Error detallado:", error);
          throw new Error("Error al quitar el like al post");
        }
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        // createContext:()=>{}
      })
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
