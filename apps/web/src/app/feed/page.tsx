"use client";

import { useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Post } from "@/types";
import { useIntersection } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";

import { cardVariants } from "@/lib/anim";
import { Icons } from "@/components/icons";
import { PostCard } from "@/components/post-card";
import { trpc } from "@/app/trpc";

export default function PostsPage() {
  const { user } = useAuth();
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } =
    trpc.getInfinitePosts.useInfiniteQuery(
      {
        limit: 3,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const allPosts = data?.pages.flatMap((page) => page.items as Post[]) || [];

  if (entry?.isIntersecting && data?.pages[data.pages.length - 1].nextCursor) {
    fetchNextPage();
  }

  console.log(data);

  return (
    <section className="flex flex-col items-center gap-4 overflow-hidden py-24">
      <AnimatePresence>
        {allPosts.map((post, index) => {
          const isLastPost = index === allPosts.length - 1;

          return (
            <motion.div
              className="flex w-full origin-top justify-center"
              key={post._id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              ref={isLastPost ? ref : null}
            >
              <PostCard
                key={post._id}
                _id={post._id}
                email={post.email}
                content={post.content}
                likedBy={post.likedBy}
                comments={post.comments}
                userEmail={user?.email || ""}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage ? (
          <Icons.loader className="text-primary h-6 w-6 animate-spin" />
        ) : data?.pages[data.pages.length - 1].nextCursor ? (
          "Cargar más"
        ) : (
          "No más posts por cargar"
        )}
      </button>
    </section>
  );
}
