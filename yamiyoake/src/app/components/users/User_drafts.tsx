import { StaticImageData } from "next/image";
import { white_reaction_icons, color_reaction_icons } from "@/app/reaction_icons";
import Link from "next/link";
import Image from "next/image";
import bookmark_icon from "@/app/img/bookmark-svgrepo-com.png";
import comment_icon from "@/app/img/comment-4-svgrepo-com.png";
import heart_icon from "@/app/img/heart-svgrepo-com.png";
import { GetAllPosts } from "@/app/api/posts";
import { useEffect, useState } from "react";
interface UserID {
    user_id: string | undefined
}
interface Post {
    post_id: string;
    user_id: string;
    show_id: string;
    title: string;
    content: string | any[];
    reaction: number;
    feel: string;
    is_sensitive: boolean;
    status: string;
    created_at: string;
    update_at: string;
    reactions: { post_id: string, id: number, isColored: boolean, white: StaticImageData, color: StaticImageData }[]
}
interface Posts {
    posts: Post[];
}

const initializeReactions = (post_id: string) => [
    { post_id: post_id, id: 0, isColored: false, white: white_reaction_icons[0], color: color_reaction_icons[0] },
    { post_id: post_id, id: 1, isColored: false, white: white_reaction_icons[1], color: color_reaction_icons[1] },
    { post_id: post_id, id: 2, isColored: false, white: white_reaction_icons[2], color: color_reaction_icons[2] },
    { post_id: post_id, id: 3, isColored: false, white: white_reaction_icons[3], color: color_reaction_icons[3] },
];
const User_Drafts: React.FC<UserID> = ({ user_id }) => {
    const [user_posts, setUserposts] = useState<Posts>({ posts: [] });;
    const [loaded, setLoaded] = useState(false); // ロード済み状態を管理
    const getAllposts = async () => {
        if (loaded) return; // 既にロード済みの場合は終了
        setLoaded(true);
        const data = await GetAllPosts();
        if (!data) { return; }
        if (!Array.isArray(data)) return;
        const updatedPosts: Post[] = data?.filter(e => e.user_id === user_id).map((e: Post) => {
            if (typeof e.content === "string") {
                // Base64文字列をデコードしてJSONオブジェクトに変換
                const decodedBytes = Uint8Array.from(atob(e.content), (c) =>
                    c.charCodeAt(0)
                );
                const decoder = new TextDecoder("utf-8");
                const jsonString = decoder.decode(decodedBytes);
                const jsonObject = JSON.parse(jsonString);
                //content以外そのまま返す
                //contentは文字列に変換されているのでjsonにしてから返す
                return {
                    ...e,
                    content: jsonObject,
                    reactions: initializeReactions(e.post_id)
                };
            }
            return { ...e, reactions: initializeReactions(e.post_id), }; // そのまま返す場合
        }) || [];

        setUserposts((prev) => ({
            posts: [...prev.posts, ...updatedPosts],
        }));
    };
    getAllposts();
    return (
        <div className="flex flex-col object-cover w-full h-full items-center hidden-scrollbar overflow-auto">
            {user_posts.posts.filter(p=>p.status==="封鎖されました").map((post, i) => (
                <div key={i} className={`w-[80%] bg-[#DDD4CF] rounded-md p-3 flex flex-col my-3`}>
                    <Link href={"/posts/" + post.post_id}>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-2xl m-3">{post.title}</span>
                            <div>
                                {post.created_at.slice(0,10).replace("-","年").replace("-","月")}日
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
                    <div className="flex justify-between full">
                        <div className="object-cover w-1/2 flex justify-between items-center">
                            <button className="flex gap-2 ml-3">
                                <Image src={comment_icon} width={30} height={30} alt="comment icon" />
                                {/* {comments.filter(c=>post.post_id===c.post_id).length} */}
                            </button>
                            <button className="flex gap-2 mr-10">
                                <Image src={heart_icon} width={30} height={30} alt="comment icon" />
                            </button>
                        </div>
                        <div className="object-cover flex w-1/2 justify-end">
                            <button >
                                <Image src={bookmark_icon} width={30} height={20} alt="book mark" />
                            </button>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    );
}
export { User_Drafts }