'use client'

import Image from "next/image";
import Link from "next/link";
import comment_icon from "@/app/img/comment-4-svgrepo-com.png";
import bookmark_icon from "@/app/img/bookmark.png";
import unbookmark_icon from "@/app/img/bookmark-white.png";
import search from "@/app/img/search-svgrepo-com.png"; 
import filter from "@/app/img/filter-svgrepo-com.png"; 
import { LeftNavigation } from "@/app/components/navigations/left";
import { RightNavigation } from "@/app/components/navigations/right";
import { useEffect, useState } from "react";
import { GetUserID } from "@/app/api/users";
import { GetAllPosts,SearchPosts,Post,Posts } from "@/app/api/posts";
import { GetAllPublicComments,Comment } from "@/app/api/comments";
import { GetAllPostsReaction,Reaction,UpdatePostReactionThanks, UpdatePostReactionHeart, UpdatePostReactionHelpful, UpdatePostReactionUseful,ReactionTypes } from "@/app/api/posts_reaction";
import { GetBookmark,CreateBookmark,DeleteBookmark,Bookmark } from "@/app/api/bookmark";
import { Header } from "@/app/components/Header";
import { color_reaction_icons,white_reaction_icons } from "@/app/reaction_icons";

export default function Home() {
    const [user_id,setUserId] = useState<string>("");
    const [posts, setPosts] = useState<Post[]>([]); // 初期状態
    const [comments,setComments] = useState<Comment[]>([]);
    const [reactions,setReactions] = useState<Reaction[]>([]);
    const [bookmarks,setBookmarks] = useState<Bookmark[]>([]);
    const [loaded, setLoaded] = useState(false); // ロード済み状態を管理
    const [keyword,setKeyword] = useState<string>("");
    // APIから投稿を取得
    const init = async ()=>{
        if (loaded) return; // 既にロード済みの場合は終了
        getUserID();
        await getAllposts();
        await getAllPublicComments();
        await getAllPostsReaction();
        await getAllBookmarks();
        setLoaded(true);
    }
    const reload = async ()=>{
        getUserID();
        await getAllposts();
        await getAllPublicComments();
        await getAllPostsReaction();
        await getAllBookmarks();
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
            const get_data = data.map(e=>e);
            setComments(get_data);
        }
    }
    const getAllPostsReaction = async ()=>{
        const data = await GetAllPostsReaction();
        if(!data)return;
        if(Array.isArray(data)){
            const get_data = data.map(e=>e);
            setReactions(get_data);
        }
    }
    const getAllBookmarks = async ()=>{
        const data = await GetBookmark();
        if(!data)return;
        if(Array.isArray(data)){
            const get_data = data.map(e=>e);
            setBookmarks(get_data);
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
        const post = reactions.filter(r=>r.post_id===post_id);
        const count:number = post.filter(r=>r[rt]).length;
        if(!count)return<>0</>;
        return(
            <>
                {count}
            </>
        )
    }

    const toggleBookMark = async(post_id:string,bookmarked:boolean)=>{
        //すでにブックマークされていたら削除する
        if(bookmarked){
            await DeleteBookmark(post_id);
        }else{
            await CreateBookmark(post_id);
        }
       
        await getAllBookmarks();
    }

    const isReaction = (post_id:string,rt:keyof Reaction):boolean=>{
        return reactions.find(r=>(r.post_id===post_id&&r.user_id===user_id&&r[rt]))?true:false;
    }

    const toggleReactions = async(post_id:string,reactionType:string)=>{
        switch(reactionType){
            case "p_reaction_thanks":
                await UpdatePostReactionThanks(post_id,user_id);
                break;
            case "p_reaction_heart":
                await UpdatePostReactionHeart(post_id,user_id);
                break;
            case "p_reaction_useful":
                await UpdatePostReactionUseful(post_id,user_id);
                break;
            case "p_reaction_helpful":
                await UpdatePostReactionHelpful(post_id,user_id);
                break;
            default:
                break;
        }
        await reload();
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
                    <Link href={"/posts/" + post.post_id} className="m-3">
                        <div className="flex items-center justify-between mb-5">
                            <span className={`font-bold text-2xl`}>
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

                        <span>
                            {/* {post.content.slice(0,20)}*/}
                            {typeof post.content !== "string"
                                ? post.content.map(c=>c.children?.map((e:any,i:number)=>(<span key={i}>{e.text}</span>)))
                                : JSON.stringify(post.content).slice(0, 87)}
                        </span>
                      </Link>

                      <div className="flex justify-between full m-3">
                          <div className="object-cover w-1/2 flex justify-between items-center">
                              <button className="flex">
                                  <Image
                                      src={comment_icon}
                                      width={30}
                                      height={30}
                                      alt="comment icon"
                                      className="mr-1"
                                  />
                                  {comments.filter(
                                      (c) => post.post_id === c.post_id
                                  ).length}
                              </button>
                              {
                                ReactionTypes.map((rt,i)=>(
                                    <button
                                        key={i} 
                                        onClick={()=>toggleReactions(post.post_id,rt)} 
                                        className="flex items-center"
                                    >
                                        <Image
                                            src={isReaction(post.post_id,rt)?color_reaction_icons[i]:white_reaction_icons[i]}
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
                              <button onClick={()=>toggleBookMark(post.post_id,bookmarks.find(b=>b.post_id===post.post_id)?true:false)}>
                                  <Image
                                      src={bookmarks.find(b=>b.post_id===post.post_id)?bookmark_icon:unbookmark_icon}
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

