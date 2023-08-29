import { Schema, Document, model } from 'mongoose';

export interface IPost extends Document {
  email: string;
  content: string;
  likedBy: string[];
  comments: Comment[];
}

export const postSchema = new Schema({
  email: { type: String, required: true },
  content: { type: String, required: true },
  likedBy: { type: [String], default: [] },
  comments: [
    {
      email: String,
      content: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export const PostModel = model<IPost>('Post', postSchema);
