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
import { GetUserID } from "./api/users";
import { GetAllPosts,SearchPosts,Post,Posts } from "@/app/api/posts";
import { GetAllPublicComments,Comment } from "./api/comments";
import { GetAllPostsReaction,Reaction,ReactionTypes } from "./api/posts_reaction";
import { Header } from "./components/Header";
import { color_reaction_icons,white_reaction_icons } from "./reaction_icons";

const initializeReactions = (post_id:string) => [
    {post_id:post_id, id: 0, isColored: false, white: white_reaction_icons[0], color: color_reaction_icons[0] },
    {post_id:post_id, id: 1, isColored: false, white: white_reaction_icons[1], color: color_reaction_icons[1] },
    {post_id:post_id, id: 2, isColored: false, white: white_reaction_icons[2], color: color_reaction_icons[2] },
    {post_id:post_id, id: 3, isColored: false, white: white_reaction_icons[3], color: color_reaction_icons[3] },
];

export default function Home() {
    const [user_id,setUserId] = useState<string>("");
    const [posts, setPosts] = useState<Post[]>([]); // 初期状態
    const [comments,setComments] = useState<Comment[]>([]);
    const [reactions,setReactions] = useState<Reaction[]>([]);
    const [loaded, setLoaded] = useState(false); // ロード済み状態を管理
    const [keyword,setKeyword] = useState<string>("");
    // APIから投稿を取得
    const init = async ()=>{
        if (loaded) return; // 既にロード済みの場合は終了
        getUserID();
        getAllposts();
        getAllPublicComments();
        getAllPostsReaction();
        setLoaded(true);
    }
    const getUserID = async ()=>{
        const id = await GetUserID();
        if(!id)return;
        setUserId(id);
    }
    const getAllposts = async () => {
        const data = await GetAllPosts();
        if(!data){return;}
        if(!Array.isArray(data))return;
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
    const getAllPublicComments = async ()=>{
        const data = await GetAllPublicComments();
        if(!data)return;
        if(Array.isArray(data)){
            setComments(data);
        }
    }
    const getAllPostsReaction = async ()=>{
        const data = await GetAllPostsReaction();
        if(!data)return;
        if(Array.isArray(data)){
            setReactions(data);
        }
    }
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

    //リアクションの数
    const getReactionCount = (post_id:string,rt:keyof Reaction)=>{
        const a = (reactions.find(r=>r.post_id===post_id));
        if(!a)return<>0</>;
        return(
        <>
            {a[rt]}
        </>
        )
    }

    //検索欄が更新し次第検索する
    useEffect(()=>{
        const KeywordChange = async()=>{
            if(keyword == "")return;
            const data = await SearchPosts(keyword);
            if(!data)return;
            if(!Array.isArray(data))return;
            data?.map((post: Post) => {
                if (typeof post.content === "string") {
                    // Base64文字列をデコードしてJSONオブジェクトに変換
                    const decodedBytes = Uint8Array.from(atob(post.content), (c) =>
                        c.charCodeAt(0)
                    );
                    const decoder = new TextDecoder("utf-8");
                    const jsonString = decoder.decode(decodedBytes);
                    const jsonObject = JSON.parse(jsonString);
    
                    post = {
                        ...post,
                        content:jsonObject
                    }
                }
                setPosts([...posts,post]);
            });
        }
        KeywordChange();
    },[keyword]);
    

    // 初回レンダリング時に投稿を取得
    useEffect(() => {
        init();
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
    useEffect(()=>{
        if(reactions && posts){
            posts.map(p=>reactions.map(e=>{p.post_id===e.post_id}));
        }
    },[reactions])

  return (
    <div className="flex w-full h-screen ">
      <LeftNavigation/>
      <div className="w-[60%] h-screen flex flex-col items-center relative">
        <Header />
        <div className="flex object-cover w-[80%] h-[6%] items-center mx-10 my-5 bg-[#DDD4CF] rounded-full p-1">
            <Image src={search} width={30} height={30} alt={"search"} className="mx-3"/>
            <input type="text" placeholder="検索" className="object-cover w-full rounded-xl bg-transparent placeholder:text-xl outline-none px-3" onChange={(e)=>setKeyword(e.target.value)}/>
            <Image src={filter} width={30} height={30} alt={"search"} className="mx-3 "/>
        </div>

        <hr className="border-2 border-[#B4ACAA] w-full mt-2" />
        <div className="w-full h-full hidden-scrollbar overflow-auto flex flex-col items-center mt-5">
            {posts.map((post, i) => (
                <div
                    key={i}
                    className="w-[80%] bg-[#DDD4CF] rounded-md p-3 flex flex-col my-3"
                >
                    <Link href={"/posts/" + post.post_id}>
                        <div className="flex items-center justify-between">
                            <span className={`font-bold text-2xl m-3`}>
                                {post.title.slice(0,20)}
                            </span>
                            <div>
                                <span className="mx-3">
                                    {post.created_at.slice(0,10).replace("-","年").replace("-","月")}日
                                </span>
                                <span className="mx-3">
                                    {post.show_id.split("-")[0]}
                                </span>
                            </div>
                        </div>
                        <span className="m-3">
                            {/* {post.content.slice(0,20)}*/}
                            {typeof post.content !== "string"
                                ? post.content.map(c=>c.children?.map((e:any,i:number)=>(<span key={i}>{e.text}</span>)))
                                : JSON.stringify(post.content).slice(0, 87)}
                        </span>
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
                                ReactionTypes.map((rt,i)=>(
                                    <button
                                            key={i} 
                                            onClick={()=>console.log("pushed")} 
                                            className="flex items-center"
                                        >
                                            <Image
                                                src={white_reaction_icons[i]}
                                                width={50}
                                                height={50}
                                                alt="heart icon"
                                            />
                                            <p>{getReactionCount(post.post_id,rt)}</p>
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

