export interface Post {
  _id: string;
  email: string;
  content: string;
  likedBy: string[];
  comments: Comment[];
}

export interface Comment {
  _id: string;
  email: string;
  content: string;
  date: Date;
}
