import sippo from "@/app/img/sippo.png";
import sippo_reply from "@/app/img/sippo_reply.png"
import send from "@/app/img/send-svgrepo-com.png";
import Image from "next/image";
import { GetPostCommentsList } from "../api/comments";
import { useEffect, useState } from "react";
interface Post{
    post_id:string,
    user_id:string
}
interface Comment{
    comments:string,
    is_public:boolean,
    reaction:number,
    user_id:string,
}
const Comments:React.FC<Post> = ({post_id,user_id}) =>{
    const [comments,setComments] = useState<Comment[]>([]);
    const [loaded,setLoaded] = useState<boolean>();
    const getComments = async()=>{
        if(loaded)return;
        const res = await GetPostCommentsList("365f7e7a-9ba0-42ce-bc77-f3b68156f4a6");
        if(!res)return;
        console.log(res);
        const data = res.data;
        if(Array.isArray(data)){
            data.map((comment:Comment)=>setComments([...comments,comment]))
        }
        setLoaded(true);
    }
    useEffect(()=>{
        getComments();
    },[comments])
    return(
        <div className="flex flex-col w-[20%] h-screen  bg-[url('img/mokume.png')] p-3 items-center relative">
            {comments?(
                <div className="object-cover w-full h-full flex flex-col items-center gap-10 hidden-scrollbar overflow-auto text-white">
                    {comments.map((e,i)=>(
                        <div key={i} className="object-cover w-[90%] relative ">
                            {e.user_id ===user_id?(
                                <div className=" bg-[#A5BBA2] rounded-lg p-3 ">
                                    <p>{e.comments}</p>
                                    <Image src={sippo} width={30} height={30} alt="sippo" className="absolute -bottom-3 right-0"/>
                                </div>):
                                (<div className="bg-[#B8A193] rounded-lg p-3">
                                    <p>{e.comments}</p>
                                    <Image src={sippo_reply} width={30} height={30} alt="sippo" className="absolute -bottom-3 left-0"/>
                                </div>)
                            }
                            
                        </div>
                    ))}
                </div>
                ):(
                    <div>
                        error
                    </div>
                )
            }
            <div className="absolute bottom-3 left-1/2 w-[90%] transition -translate-x-1/2 rounded-xl bg-[#DCD5CD] flex justify-center p-3 ">
                <textarea  className="bg-[#DCD5CD] outline-none focus:h-56 resize-none hidden-scrollbar w-full"/>
                <button className="absolute right-3 bottom-3"><Image src={send} alt="send" width={30} height={30} /></button>
            </div>
            
        </div>
        
    )
}
export {Comments}