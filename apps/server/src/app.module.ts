import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TrpcModule } from './trpc/trpc.module';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '@server/models/user.model';
import { postSchema } from './models/post.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TrpcModule,
    MongooseModule.forRoot(process.env.DB_URI as string),
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    MongooseModule.forFeature([{ name: 'Post', schema: postSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
