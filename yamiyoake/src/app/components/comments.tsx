import sippo from "@/app/img/sippo.png";
import sippo_reply from "@/app/img/sippo_reply.png"
import send from "@/app/img/send-svgrepo-com.png";
import Image from "next/image";
import eyeoff from "@/app/img/eye-off.png";
import eyeshow from "@/app/img/eye-show.png";
import { useEffect, useState } from "react";
import { GetPostCommentsList } from "@/app/api/comments";
import { GetAllCommentsReaction,Reaction,ReactionTypes } from "@/app/api/comments_reaction";
import { color_reaction_icons,white_reaction_icons } from "@/app/reaction_icons";

interface Post{
    post_id:string,
    user_id:string
}
interface Comment{
    comments:string,
    is_public:boolean,
    reaction:number,
    user_id:string,
    comment_id:string
}
const Comments:React.FC<Post> = ({post_id,user_id}) =>{
    const [comments,setComments] = useState<Comment[]>([]);
    const [reactions,setReactions] = useState<Reaction[]>([]);
    const [loaded,setLoaded] = useState<boolean>();
    const init = async () =>{
        if(loaded)return;
        getComments();
        getAllCommentsReaction();
        setLoaded(true);
    }
    const getComments = async()=>{
        const res = await GetPostCommentsList(post_id);
        if(!res)return;
        console.log(res);
        const data = res.data;
        if(Array.isArray(data)){
            const get_comments = data.map((comment:Comment)=>comment);
            setComments(get_comments);
        }
    }
    const getAllCommentsReaction = async()=>{
        const data = await GetAllCommentsReaction();
        if(!data)return;
        if(Array.isArray(data)){
            const get_reaction = data.map((reaction:Reaction)=>reaction);
            setReactions(get_reaction);
        }
    }

    const getReactionCount = (comment_id:string,rt:keyof Reaction)=>{
        const a = (reactions.find(r=>r.comment_id===comment_id));
        if(!a)return<>0</>;
        return(
        <>
            {a[rt]}
        </>
        )
    }
    
    useEffect(()=>{
        init();
    },[])
    

    return(
        <div className="flex flex-col w-[20%] h-screen  bg-[url('img/mokume.png')] p-3 items-center relative">
            {comments?(
                <div className="object-cover w-full h-full flex flex-col items-center gap-10 hidden-scrollbar overflow-auto text-white">
                    {comments.map((comment,i)=>(
                        <div key={i} className="object-cover w-[90%] relative ">
                            <div className="object-cover w-full relative flex">
                                {comment.user_id ===user_id?(
                                    <div className=" bg-[#A5BBA2] rounded-lg p-3 ">
                                        <p>{comment.comments}</p>
                                        <Image src={sippo} width={30} height={30} alt="sippo" className="absolute -bottom-3 right-0"/>
                                    </div>):
                                    (<div className="bg-[#B8A193] rounded-lg p-3">
                                        <p>{comment.comments}</p>
                                        <Image src={sippo_reply} width={30} height={30} alt="sippo" className="absolute -bottom-3 left-0"/>
                                    </div>)
                                }
                                <div className="object-cover flex items-center">
                                    <Image src={comment.is_public?eyeshow:eyeoff} alt="test" className="w-full"/>
                                </div>
                                
                            </div>
                            <div className="flex ml-3">
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
                                            <p>{getReactionCount(comment.comment_id,rt)}</p>
                                        </button>
                                    ))
                                }  
                                
                            </div>
                         
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