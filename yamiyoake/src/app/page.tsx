'use client'
import { LeftNavigation } from "./components/navigations/left";
import { RightNavigation } from "./components/navigations/right";
import { useEffect, useState } from "react";
import { SearchInput } from "./components/main/searchInput";
import Image from "next/image";
import Link from "next/link";
import heart_icon from "@/app/img/heart-svgrepo-com.png";
import comment_icon from "@/app/img/comment-4-svgrepo-com.png";
import bookmark_icon from "@/app/img/bookmark-svgrepo-com.png";
import { comments, testData } from "@/app/test_data"; // 使用するデータ
import { GetAllPosts } from "@/app/api/posts/route";
import { Header } from "./components/Header";

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
export default function Home() {
  const [posts, setPosts] = useState<Posts>({ posts: [] }); // 初期状態
    const [loaded, setLoaded] = useState(false); // ロード済み状態を管理

    // APIから投稿を取得
    const getAllposts = async () => {
        if (loaded) return; // 既にロード済みの場合は終了
        const res = await GetAllPosts();
        if(!res){return;}
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

    //報告部分のtoggle
    const toggleReport = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,hidden:boolean) =>{
        const report = document.getElementById("report");
        if(!report)return;
        if(hidden){
            report?.classList.add("hidden");
            return;
        }
        const target:HTMLElement = e.target as HTMLElement;
        report.classList.remove("hidden");
        target.appendChild(report);
    }

    // 初回レンダリング時に投稿を取得
    useEffect(() => {
        getAllposts();
        document.addEventListener("click",(e)=>{
            const target:HTMLElement = e.target as HTMLElement;
            if(target.classList.contains("reportButton"))return;
            const report = document.getElementById("report");
            if(!report)return;
            if(!(report.classList.contains("hidden"))){
                report.classList.add("hidden");
            }
        })
    }, []);
  return (
    <div className="flex w-full h-screen ">
      <LeftNavigation/>
      <div className="w-[60%] h-screen flex flex-col items-center relative">
        <Header />
        <SearchInput />
        <hr className="border-2 border-[#B4ACAA] w-full mt-5" />
        <div className="w-full h-[65%] hidden-scrollbar overflow-auto flex flex-col items-center">
            {testData.map((post, i) => (
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
                                <span className="mx-3">
                                    {post.created_at.slice(0,10).replace("-","年").replace("-","月")}日
                                </span>
                                <span className="mx-3">
                                    {post.show_id}
                                </span>
                            </div>
                        </div>
                        <span className="m-3">
                            {post.content.slice(0,20)}
                            {/* {typeof !== "string"
                                ? post.content.map(c=>c.children.map((e:any,i:number)=>(<span key={i}>{e.text}</span>)))
                                : JSON.stringify(post.content).slice(0, 87)} */}
                        </span>
                      </Link>

                      <div className="flex justify-between full m-3">
                          <div className="object-cover w-1/2 flex justify-between items-center">
                              <button className="flex  ml-3">
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
                              <button className="flex mr-10">
                                  <Image
                                      src={heart_icon}
                                      width={30}
                                      height={30}
                                      alt="heart icon"
                                  />
                              </button>
                          </div>
                          <div className="object-cover flex w-1/2 justify-end">
                              <button className="reportButton relative mr-3" 
                              onClick={e=>toggleReport(e,false)}
                              >
                                  ・・・
                                  
                              </button>
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
                </div>
            ))}
        </div>
        <div id="report" className="hidden object-cover w-44 absolute -top-3 -left-3 transition -translate-x-1/2 flex flex-col justify-start items-start bg-[#DCD5CD] rounded-xl shadow-2xl ">
            <button className="object-cover w-full hover:bg-[#D1C6BC] text-left px-3 text-red-500" onClick={e=>toggleReport(e,true)}>この投稿を通報</button>
            <button className="object-cover w-full hover:bg-[#D1C6BC] text-left px-3 text-red-500" onClick={e=>toggleReport(e,true)}>このユーザーを通報</button>
            <button className="object-cover w-full hover:bg-[#D1C6BC] text-left px-3" onClick={e=>toggleReport(e,true)}>このユーザーをブロック</button>
            
        </div>
      </div>
      <RightNavigation/>
    </div>
  );
}

