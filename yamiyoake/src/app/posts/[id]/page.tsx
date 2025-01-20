'use client'
import { useState,useEffect } from "react";
import { testData } from "@/app/test_data";
import { Comments } from "@/app/components/comments";
import { LeftNavigation } from "@/app/components/navigations/left";
import { color_feel_icons  } from "@/app/feel_icons"; 
import bookmark from "@/app/img/bookmark-svgrepo-com.png";
import Image from "next/image";
import { Header } from "@/app/components/Header";
import { color_reaction_icons,white_reaction_icons } from "@/app/reaction_icons";
import { GetAllPosts } from "@/app/api/posts";
import { StaticImageData } from "next/image";
import {FiChevronRight,FiChevronLeft} from "react-icons/fi";

interface PostID{
    params:{id:string | null}
}

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
interface content{
    text: string,
    fontsize: number,
    bold: boolean,
    italic: boolean,
    underline: boolean,
    strike: boolean,
    color: string
};

export default function Posts({params}:PostID){
    const [id, setId] = useState<string | null>(null);
    const [post, setPost] = useState<Post>(); // 初期状態
    const [loaded, setLoaded] = useState(false); // ロード済み状態を管理
    const [selectPage,setSelectPage] = useState<number>(0);
    // APIから投稿を取得
    const getAllposts = async () => {
        if (loaded) return; // 既にロード済みの場合は終了
        const data = await GetAllPosts();
        if(!data){return;}
        if(!Array.isArray(data))return;
        let target = data.find((e:Post)=>e.post_id===id) as Post;
        if(typeof target?.content !== "string")return;
        const decodedBytes = Uint8Array.from(atob(target.content), (c) =>
            c.charCodeAt(0)
        );
        const decoder = new TextDecoder("utf-8");
        const jsonString = decoder.decode(decodedBytes);
        const jsonObject = JSON.parse(jsonString);
        console.log(jsonObject)
        target = {...target,content:jsonObject};
        setPost(target as Post);
        setLoaded(true); // ロード済み状態を更新
    };
    useEffect(() => {
        async function unwrapParams() {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        }
        unwrapParams();
    }, [params]);

    useEffect(() => {
        getAllposts();
    }, [id]);
    
    useEffect(()=>{
        console.log(post);
    },[post])
    if (!post) {
        return <div>LOADING</div>;
    }
    return(
        <div className="flex w-full h-screen">
            <LeftNavigation/>
            <div className="flex flex-col w-[60%] bg-[#E8E7E6] relative">
                <Header/>
                <div className="flex flex-col  m-10">
                    <div className="flex justify-between items-center">
                        <Image src={color_feel_icons[0]} width={50} height={50} alt="reaction" />
                        <p className="text-2xl font-extrabold">{post.title}</p>
                        <Image src={bookmark} width={50} height={50} alt="bookmark"/>
                    </div>
                    <div className="flex items-center justify-end p-10 text-[#BEA99D]">
                        <p>{post.created_at.slice(0,10).replace("-","年").replace("-","月")}日</p>
                        <p className="mx-5">{post.show_id.split("-")[0]}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-[#807166]">
                            {post.content[selectPage].children.map((e:content,i:number)=>(
                                <span key={i} style={{
                                    fontWeight: e.bold ? 'bold' : 'normal',
                                    fontSize: e.fontsize ? e.fontsize + 'px' : '16px',
                                    fontStyle: e.italic ? 'italic' : 'normal',
                                    textDecorationLine: e.underline ? 'underline' : e.strike ? 'line-through' : 'none',
                                    color: e.color ? e.color : 'black',
                                }}>
                                    {e.text}
                                </span>
                            ))}
                        </div>
                        <div className="w-[50%] flex items-center justify-around">
                            <button className="w-[10%]" onClick={()=>{setSelectPage(selectPage > 0?selectPage-1:0)}}><FiChevronLeft className="w-full h-full" /></button>
                            {typeof post.content !== "string"
                                ? post.content.map((_,i)=>(<span key={i} className={`w-8 h-8 flex items-center justify-center text-center text-xl ${selectPage==i?"bg-[#A5BCA2] text-white":"text-[#A5BCA2]"} rounded-2xl`}>{i+1}</span>))
                                : "content"}
                            <button className="w-[10%]" onClick={()=>{setSelectPage(selectPage < post.content.length-1?selectPage+1:post.content.length-1)}}><FiChevronRight className="w-full h-full" /></button>
                        </div>
                    </div>
                </div>
                
            </div>
            <Comments post_id={post?.post_id as string} user_id={post?.user_id as string}/>
        </div>
    );
}