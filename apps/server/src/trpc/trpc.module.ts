import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrpcService } from '@server/trpc/trpc.service';
import { TrpcRouter } from '@server/trpc/trpc.router';
import { userSchema } from '@server/models/user.model';
import { postSchema } from '@server/models/post.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    MongooseModule.forFeature([{ name: 'Post', schema: postSchema }]),
  ],
  controllers: [],
  providers: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
