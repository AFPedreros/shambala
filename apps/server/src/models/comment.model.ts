import { Schema, model, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  createdAt: Date;
  author: Schema.Types.ObjectId; 
  post: Schema.Types.ObjectId; 
}

const commentSchema = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

export const Comment = model<IComment>('Comment', commentSchema);
