import { StaticImageData } from "next/image";
import { white_reaction_icons, color_reaction_icons } from "@/app/reaction_icons";
import Link from "next/link";
import Image from "next/image";
import bookmark_icon from "@/app/img/bookmark.png";
import comment_icon from "@/app/img/comment-4-svgrepo-com.png";
import heart_icon from "@/app/img/heart-svgrepo-com.png";
import { GetAllPosts, Post } from "@/app/api/posts";
import { useEffect, useState } from "react";
import { GetAllPublicComments, Comment } from "@/app/api/comments";
import { GetAllPostsReaction, Reaction, ReactionTypes } from "@/app/api/posts_reaction";
interface UserID {
    user_id: string | undefined
}
const User_Bookmarks: React.FC<UserID> = ({ user_id }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [reactions, setReactions] = useState<Reaction[]>([]);
    const [loaded, setLoaded] = useState(false); // ロード済み状態を管理
    const init = async () => {
        if (loaded) return; // 既にロード済みの場合は終了
        getAllposts();
        getAllPublicComments();
        getAllPostsReaction();
        setLoaded(true);
    }
    const getAllposts = async () => {
        const data = await GetAllPosts();
        if (!data) { return; }
        if (!Array.isArray(data)) return;
        const get_posts = data?.map((post: Post) => {
            if (typeof post.content === "string") {
                try {
                    //エンコードする
                    const decodedBytes = Uint8Array.from(atob(post.content), (c) => c.charCodeAt(0));
                    const decoder = new TextDecoder("utf-8");
                    const jsonString = decoder.decode(decodedBytes);
                    const jsonObject = JSON.parse(jsonString);

                    // 更新して変えす
                    return {
                        ...post,
                        content: jsonObject,
                    };
                } catch (error) {
                    console.error("Failed to decode post content:", error);
                }
            }
            // 文字列ならそのまま返す
            return post;
        });
        setPosts(get_posts);
    };
    const getAllPublicComments = async () => {
        const data = await GetAllPublicComments();
        if (!data) return;
        if (Array.isArray(data)) {
            setComments(data);
        }
    }
    const getAllPostsReaction = async () => {
        const data = await GetAllPostsReaction();
        if (!data) return;
        if (Array.isArray(data)) {
            setReactions(data);
        }
    }
    //リアクションの数
    const getReactionCount = (post_id: string, rt: keyof Reaction) => {
        const a = (reactions.find(r => r.post_id === post_id));
        if (!a) return <>0</>;
        return (
            <>
                {a[rt]}
            </>
        )
    }
    useEffect(() => {
        init();
    }, [])
    return (
        <div className="flex flex-col object-cover w-full h-full items-center hidden-scrollbar overflow-auto">
            {posts.filter(e => e.user_id === user_id).map((post, i) => (
                <div key={i} className={`w-[80%] bg-[#DDD4CF] rounded-md p-3 flex flex-col my-3`}>
                    <Link href={"/posts/" + post.post_id}>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-2xl m-3">{post.title}</span>
                            <div>
                                {post.created_at.slice(0, 10).replace("-", "年").replace("-", "月")}日
                                <span className="m-3">{post.show_id.split("-")[0]}</span>
                            </div>
                        </div>
                        <p className="m-3">
                            {/*いい感じに2行に収める  */}
                            {typeof post.content !== "string"
                                ? post.content.map(c => c.children?.map((e: any, i: number) => (<span key={i}>{e.text}</span>)))
                                : JSON.stringify(post.content).slice(0, 87)}
                        </p>
                    </Link>
                    <div className="flex justify-between full m-3">
                        <div className="object-cover w-1/2 flex justify-between items-center">
                            <button className="flex ml-3">
                                <Image
                                    src={comment_icon}
                                    width={30}
                                    height={30}
                                    alt="comment icon"
                                />
                                {comments.filter(
                                    (c) => post.post_id === c.post_id
                                ).length}
                            </button>
                            {
                                ReactionTypes.map((rt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => console.log("pushed")}
                                        className="flex items-center"
                                    >
                                        <Image
                                            src={white_reaction_icons[i]}
                                            width={50}
                                            height={50}
                                            alt="heart icon"
                                        />
                                        <p>{getReactionCount(post.post_id, rt)}</p>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    );
}
export { User_Bookmarks }

