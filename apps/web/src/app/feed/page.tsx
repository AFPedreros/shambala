"use client";

import { useAuth } from "@/context/AuthContext";
import { Post } from "@/types";

import { PostCard } from "@/components/post-card";
import { trpc } from "@/app/trpc";

export default function PostsPage() {
  const { user } = useAuth();
  const { isLoading, isError, data, error } = trpc.getPosts.useQuery({
    queryKey: "getPosts",
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (data) {
    const postsData = data as Post[];
    return (
      <section className="flex flex-col items-center gap-4 overflow-hidden py-24">
        {postsData.map((post) =>
          user && user.email ? (
            <PostCard
              key={post._id}
              _id={post._id}
              email={post.email}
              content={post.content}
              likedBy={post.likedBy}
              comments={post.comments}
              userEmail={user.email}
            />
          ) : null
        )}
      </section>
    );
  }
}
