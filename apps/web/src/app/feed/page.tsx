"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { trpc } from "@web/src/app/trpc"

import { PostCard } from "@/components/post-card"
import { useAuth } from "@/components/useAuth"

interface Comment {
  _id: string
  email: string
  content: string
  createdAt: Date
}

interface Post {
  _id: string
  email: string
  content: string
  likedBy: string[]
  comments: Comment[]
}

export default function PostsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { isLoading, isError, data, error } = trpc.getPosts.useQuery()

  console.log(data)

  const [initialLoad, setInitialLoad] = useState(true)

  function handlePostDeleted(postId: string) {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId))
  }

  // async function fetchPosts() {
  //     if (initialLoad) setLoading(true);
  //     try {
  //         // const data = await trpc.getPosts.query() as Post[];
  //         const data = trpc.getPosts.useQuery(); as Post[];
  //         setPosts(data.;
  //         if (initialLoad) setInitialLoad(false);
  //     } catch (error) {
  //         console.error("Error fetching posts:", error);
  //     } finally {
  //         if (initialLoad) setLoading(false);
  //     }
  // }

  // useEffect(() => {
  //     fetchPosts();
  //     const intervalId = setInterval(fetchPosts, 500);
  //     fetchPosts();
  // }, []);

  useEffect(() => {
    if (user == null) router.push("/iniciar-sesion")
  }, [user])

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (data) {
    const postsData = data as Post[]
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
              onPostDeleted={handlePostDeleted}
              userEmail={user.email}
            />
          ) : null
        )}
      </section>
    )
  }
}
