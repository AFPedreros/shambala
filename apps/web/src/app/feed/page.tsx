"use client";

import { useAuth } from "@/context/AuthContext";
import { Post } from "@/types";
import { motion } from "framer-motion";

import { postContainerVariants, postVariants } from "@/lib/anim";
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
      <motion.section
        className="flex flex-col items-center gap-4 overflow-hidden py-24"
        variants={postContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {postsData.map((post) =>
          user && user.email ? (
            <motion.div
              key={post._id}
              exit={{ opacity: 0 }}
              variants={postVariants}
            >
              <PostCard
                key={post._id}
                _id={post._id}
                email={post.email}
                content={post.content}
                likedBy={post.likedBy}
                comments={post.comments}
                userEmail={user.email}
              />
            </motion.div>
          ) : null
        )}
      </motion.section>
    );
  }
}
