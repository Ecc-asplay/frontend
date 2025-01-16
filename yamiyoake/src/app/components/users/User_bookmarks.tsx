import { testData, comments } from "@/app/test_data";
import Link from "next/link";
import Image from "next/image";
import bookmark_icon from "@/app/img/bookmark-svgrepo-com.png";
import comment_icon from "@/app/img/comment-4-svgrepo-com.png";
import heart_icon from "@/app/img/heart-svgrepo-com.png";
import { GetAllPosts } from "@/app/api/posts";
import { GetBookmark } from "@/app/api/bookmark";
import { useState, useEffect, useCallback } from "react";
import { StaticImageData } from "next/image";
import { color_reaction_icons, white_reaction_icons } from "@/app/reaction_icons";

// 型定義
interface UserID {
    user_id: string | undefined;
}

interface Post {
    post_id: string;
    user_id: string;
    title: string;
    content: string | any[];
    created_at: string;
    reactions: { id: number; isColored: boolean; white: StaticImageData; color: StaticImageData }[];
}

interface Bookmark {
    post_id: string;
    user_id: string;
}

const initializeReactions = (post_id: string) => [
    { id: 0, isColored: false, white: white_reaction_icons[0], color: color_reaction_icons[0] },
    { id: 1, isColored: false, white: white_reaction_icons[1], color: color_reaction_icons[1] },
    { id: 2, isColored: false, white: white_reaction_icons[2], color: color_reaction_icons[2] },
    { id: 3, isColored: false, white: white_reaction_icons[3], color: color_reaction_icons[3] },
];

const User_Bookmarks: React.FC<UserID> = ({ user_id }) => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const fetchBookmarks = useCallback(async () => {
        try {
            const res = await GetBookmark();
            if (res && Array.isArray(res.data)) {
                setBookmarks(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch bookmarks:", error);
        }
    }, []);

    const fetchPosts = useCallback(async () => {
        try {
            const data = await GetAllPosts();
            if (data && Array.isArray(data)) {
                const formattedPosts = data.map((post: any) => {
                    if (typeof post.content === "string") {
                        const decodedBytes = Uint8Array.from(atob(post.content), (c) =>
                            c.charCodeAt(0)
                        );
                        const decoder = new TextDecoder("utf-8");
                        const jsonString = decoder.decode(decodedBytes);
                        const jsonObject = JSON.parse(jsonString);
                        return { ...post, content: jsonObject, reactions: initializeReactions(post.post_id) };
                    }
                    return { ...post, reactions: initializeReactions(post.post_id) };
                });
                setPosts(formattedPosts);
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    }, []);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            fetchBookmarks();
            fetchPosts();
        }
    }, [loaded, fetchBookmarks, fetchPosts]);

    const bookmarkedPosts = posts.filter(post => bookmarks.some(b => b.post_id === post.post_id));

    return (
        <div className="flex flex-col object-cover w-full h-full items-center hidden-scrollbar overflow-auto">
            {bookmarkedPosts.map((post, i) => (
                <div key={i} className="w-[80%] bg-[#DDD4CF] rounded-md p-3 flex flex-col my-3">
                    <Link href={"/posts/" + post.post_id}>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-2xl m-3">{post.title}</span>
                            <div>
                                {post.created_at.slice(0, 10).replace("-", "年").replace("-", "月")}日
                            </div>
                        </div>
                        <p>
                            {typeof post.content !== "string"
                                    ? post.content.map(c => c.children?.map((e: any, i: number) => (<span key={i}>{e.text}</span>)))
                                    : JSON.stringify(post.content).slice(0, 87)}
                        </p>
                    </Link>
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            <button className="flex gap-2">
                                <Image src={comment_icon} width={30} height={30} alt="comment icon" />
                                {comments.filter(c => c.post_id === post.post_id).length}
                            </button>
                            <button>
                                <Image src={heart_icon} width={30} height={30} alt="heart icon" />
                            </button>
                        </div>
                        <button>
                            <Image src={bookmark_icon} width={30} height={20} alt="bookmark icon" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export { User_Bookmarks };
