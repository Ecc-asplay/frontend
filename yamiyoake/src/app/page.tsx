'use client'

import Image from "next/image";
import Link from "next/link";
import comment_icon from "@/app/img/comment-4-svgrepo-com.png";
import bookmark_icon from "@/app/img/bookmark-svgrepo-com.png";
import search from "@/app/img/search-svgrepo-com.png"; 
import filter from "@/app/img/filter-svgrepo-com.png"; 
import { LeftNavigation } from "./components/navigations/left";
import { RightNavigation } from "./components/navigations/right";
import { useEffect, useState } from "react";
import { comments, testData } from "@/app/test_data"; // 使用するデータ
import { GetAllPosts,SearchPosts } from "@/app/api/posts";
import { Header } from "./components/Header";
import { color_reaction_icons,white_reaction_icons } from "./reaction_icons";
import { StaticImageData } from "next/image";

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
  reactions:{post_id:string, id: number, isColored: boolean, white: StaticImageData, color: StaticImageData}[]    
}
interface Posts {
  posts: Post[];
}

const initializeReactions = (post_id:string) => [
    {post_id:post_id, id: 0, isColored: false, white: white_reaction_icons[0], color: color_reaction_icons[0] },
    {post_id:post_id, id: 1, isColored: false, white: white_reaction_icons[1], color: color_reaction_icons[1] },
    {post_id:post_id, id: 2, isColored: false, white: white_reaction_icons[2], color: color_reaction_icons[2] },
    {post_id:post_id, id: 3, isColored: false, white: white_reaction_icons[3], color: color_reaction_icons[3] },
];

export default function Home() {
    const [posts, setPosts] = useState<Posts>({ posts: [] }); // 初期状態
    const [loaded, setLoaded] = useState(false); // ロード済み状態を管理
    const [keyword,setKeyword] = useState<string>("");
    // APIから投稿を取得
    const getAllposts = async () => {
        if (loaded) return; // 既にロード済みの場合は終了
        const res = await GetAllPosts();
        console.log(res);
        if(!res){return;}
        if(!Array.isArray(res.data))return;
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
                    reactions:initializeReactions(e.post_id)
                };
            }
            return {...e,reactions:initializeReactions(e.post_id),}; // そのまま返す場合
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

    //リアクションボタンを押した際
    const toggleReactionColor = (index:number,post_id:string)=>{
        setPosts((prev) => ({
            posts: prev.posts.map((post, i) =>
                post.post_id === post_id
                    ? {
                          ...post,
                          reactions: post.reactions.map((reaction, j) =>
                              j === index
                                  ? { ...reaction, isColored: !reaction.isColored }
                                  : reaction
                          ),
                      }
                    : post
            ),
        }));
    }

    //検索欄が更新し次第検索する
    useEffect(()=>{
        const KeywordChange = async()=>{
            if(keyword == "")return;
            const res = await SearchPosts(keyword);
            if(!res)return;
            if(!Array.isArray(res.data))return;
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
                        reactions:initializeReactions(e.post_id)
                    };
                }
                return {...e,reactions:initializeReactions(e.post_id),}; // そのまま返す場合
            }) || [];
            setPosts((prev) => ({
                posts: [...prev.posts, ...updatedPosts],
            }));
        }
        KeywordChange();
    },[keyword]);
    

    // 初回レンダリング時に投稿を取得
    useEffect(() => {
        getAllposts();

        //通報のやつが出ているときにほかのところをクリックすると非表示にする
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
        <div className="flex object-cover w-[80%] items-center m-10 bg-[#DDD4CF] rounded-2xl p-1">
            <Image src={search} width={30} height={30} alt={"search"} className="mx-3"/>
            <input type="text" placeholder="検索" className="object-cover w-full rounded-xl bg-transparent  outline-none px-3" onChange={(e)=>setKeyword(e.target.value)}/>
            <Image src={filter} width={30} height={30} alt={"search"} className="mx-3"/>
        </div>
        <hr className="border-2 border-[#B4ACAA] w-full mt-5" />
        <div className="w-full h-[65%] hidden-scrollbar overflow-auto flex flex-col items-center">
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
                                <span className="mx-3">
                                    {post.created_at.slice(0,10).replace("-","年").replace("-","月")}日
                                </span>
                                <span className="mx-3">
                                    {post.show_id}
                                </span>
                            </div>
                        </div>
                        <span className="m-3">
                            {/* {post.content.slice(0,20)} */}
                            {typeof post.content !== "string"
                                ? post.content.map(c=>c.children.map((e:any,i:number)=>(<span key={i}>{e.text}</span>)))
                                : JSON.stringify(post.content).slice(0, 87)}
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
                              {
                                post.reactions.map((e,i)=>(
                                    <button
                                            key={i} 
                                            onClick={e=>toggleReactionColor(i,post.post_id)} 
                                            className="flex items-center"
                                        >
                                            <Image
                                                src={e.isColored?e.color:e.white}
                                                width={50}
                                                height={50}
                                                alt="heart icon"
                                            />
                                            <p>0</p>
                                        </button>
                                ))
                              }

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

