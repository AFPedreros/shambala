'use client';

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/useAuth";
import { useEffect, useState } from 'react';
import { PostCard } from '@/components/post-card';
import { trpc } from '@web/src/app/trpc';

interface Comment {
    _id: string;
    email: string;
    content: string;
    createdAt: Date;
}

interface Post {
    _id: string;
    email: string;
    content: string;
    likedBy: string[];
    comments: Comment[];
}

export default function PostsPage() {
    const { user } = useAuth();
    const router = useRouter()
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    console.log(user)

    const [initialLoad, setInitialLoad] = useState(true);

    function handlePostDeleted(postId: string) {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    }

    async function fetchPosts() {
        if (initialLoad) setLoading(true);
        try {
            const data = await trpc.getPosts.query() as Post[];
            setPosts(data);
            if (initialLoad) setInitialLoad(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            if (initialLoad) setLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
        const intervalId = setInterval(fetchPosts, 500);
        fetchPosts();
    }, []);

    useEffect(() => {
        if (user == null) router.push("/iniciar-sesion")
    }, [user])

    return (
        <section className="flex flex-col gap-4 items-center py-24 overflow-hidden">
            {posts.map(post => (
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
            ))}
        </section>
    )
}
