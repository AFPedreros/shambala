import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { userSchema } from "@server/models/user.model"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { postSchema } from "./models/post.model"
import { TrpcModule } from "./trpc/trpc.module"

@Module({
  imports: [
    ConfigModule.forRoot(),
    TrpcModule,
    MongooseModule.forRoot(process.env.DB_URI as string),
    MongooseModule.forFeature([{ name: "User", schema: userSchema }]),
    MongooseModule.forFeature([{ name: "Post", schema: postSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
