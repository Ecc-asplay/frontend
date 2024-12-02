import { useEffect, useState } from "react";
import { SearchInput } from "./searchInput";
import Image from "next/image";
import Link from "next/link";
import heart_icon from "@/app/img/heart-svgrepo-com.png";
import comment_icon from "@/app/img/comment-4-svgrepo-com.png";
import bookmark_icon from "@/app/img/bookmark-svgrepo-com.png";
import { comments } from "@/app/test_data"; // 使用するデータ
import { GetAllPosts } from "@/app/api/posts/route";
import { Header } from "../Header";
// 型定義
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
}
interface Posts {
    posts: Post[];
}

const Main = () => {
    const [posts, setPosts] = useState<Posts>({ posts: [] }); // 初期状態
    const [loaded, setLoaded] = useState(false); // ロード済み状態を管理

    // APIから投稿を取得
    const getAllposts = async () => {
        if (loaded) return; // 既にロード済みの場合は終了
        const res = await GetAllPosts();
        console.log(res);
        const updatedPosts: Post[] = res.data?.map((e: Post) => {
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
                };
            }
            return e; // そのまま返す場合
        }) || [];

        setPosts((prev) => ({
            posts: [...prev.posts, ...updatedPosts],
        }));
        setLoaded(true); // ロード済み状態を更新
    };

    // 初回レンダリング時に投稿を取得
    useEffect(() => {
        getAllposts();
    }, []);

    return (
        <div className="flex flex-col object-cover h-screen bg-[#E8E7E5] w-[60%] items-center">
            <Header/>
            <SearchInput />
            <hr className="border-2 border-[#B4ACAA] w-full mt-5" />
            <div className="object-cover w-full hidden-scrollbar overflow-auto flex flex-col items-center">
                {posts.posts.map((post, i) => (
                    <div
                        key={i}
                        className="w-[80%] bg-[#DDD4CF] rounded-md p-3 flex flex-col my-3"
                    >
                        <Link href={"/posts/" + post.post_id}>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-2xl m-3">
                                    {post.title.slice(0,20)}
                                </span>
                                <div>
                                    <span className="m-3">
                                        {post.created_at.slice(0,10).replace("-","年").replace("-","月")}日
                                    </span>
                                    <span className="m-3">
                                        {post.show_id}
                                    </span>
                                </div>
                            </div>
                            <span className="m-3">
                                {typeof post.content !== "string"
                                    ? post.content.map(c=>c.children.map((e:any,i:number)=>(<span key={i}>{e.text}</span>)))
                                    : JSON.stringify(post.content).slice(0, 87)}
                            </span>
                            <div className="flex justify-between full m-3">
                                <div className="object-cover w-1/2 flex justify-between items-center">
                                    <button className="flex gap-2 ml-3">
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
                                    <button className="flex gap-2 mr-10">
                                        <Image
                                            src={heart_icon}
                                            width={30}
                                            height={30}
                                            alt="heart icon"
                                        />
                                    </button>
                                </div>
                                <div className="object-cover flex w-1/2 justify-end">
                                    <button>
                                        <Image
                                            src={bookmark_icon}
                                            width={30}
                                            height={20}
                                            alt="bookmark icon"
                                        />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { Main };
