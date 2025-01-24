import { testData,comments } from "@/app/test_data";
import Image from "next/image";
import sippo from "@/app/img/sippo.png";
import back from "@/app/img/back-svgrepo-com.png";
import { GetAllPosts, Post } from "@/app/api/posts";
import { GetAllMyComments,Comment } from "@/app/api/comments";
import { useEffect, useState } from "react";
interface UserID{
    user_id:string | undefined
}
const User_Comments:React.FC<UserID> = ({user_id}) =>{
    const [posts,setPosts] = useState<Post[]>([]);
    const [user_comments,setUserComments] = useState<Comment[]>([]);
    const [loaded,setLoaded] = useState(false);
    const init = async () => {
        if (loaded) return; // 既にロード済みの場合は終了
        getAllposts();
        getAllComments();
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
    const getAllComments = async()=>{
        const data = await GetAllMyComments();
        console.log(data);
        if(Array.isArray(data)){
            const get_user_comments = data.map(e=>e);
            setUserComments(get_user_comments);
        }
    }
    useEffect(()=>{
        init();
    },[])
    return(
        <div className="flex flex-col object-cover w-full h-full items-center hidden-scrollbar overflow-auto">
            {user_comments.map((comment,i)=>(
                    <div className="m-3 w-[80%] relative" key={i} >
                        <div className="post bg-[#C6CBBC] flex items-center rounded-t-lg  ">
                            <Image src={back} width={50} height={50} alt="back" className="mx-3"/>
                            <span className="mx-3 text-[#5A6C58] font-bold text-2xl">{testData.find(e=>e.post_id===comment.post_id)?.title}</span>
                            <span className="mx-3">{posts.find(e=>e.post_id===comment.post_id)?.title.slice(0,20)}...</span>
                        </div>
                        <hr className="w-full h-[3px] bg-[#5A6C58]"/>
                        <div className="comment p-3 bg-[#A5BBA2] rounded-b-lg ">
                            <span className="text-white text-xl">{comment.comments}</span>
                        </div>
                        <Image src={sippo} width={30} height={30} alt="sippo" className="absolute right-0 -bottom-3" />
                    </div>        
                ))
            }
        </div>
    );
}
export {User_Comments}