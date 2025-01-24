import sippo from "@/app/img/sippo.png";
import sippo_reply from "@/app/img/sippo_reply.png"
import send from "@/app/img/send-svgrepo-com.png";
import Image from "next/image";
import eyeoff from "@/app/img/eye-off.png";
import eyeshow from "@/app/img/eye-show.png";
import { useEffect, useState } from "react";
import { GetUserID } from "../api/users";
import { GetPostCommentsList,CreateComment,Comment } from "@/app/api/comments";
import { GetAllCommentsReaction,UpdateCommentReactionHeart, UpdateCommentReactionHelpful, UpdateCommentReactionThanks, UpdateCommentReactionUseful ,Reaction,ReactionTypes } from "@/app/api/comments_reaction";
import { color_reaction_icons,white_reaction_icons } from "@/app/reaction_icons";

interface Post{
    post_id:string,
}

const Comments:React.FC<Post> = ({post_id}) =>{
    const [user_id,setUserId] = useState<string>("");
    const [comment,setComment] = useState<string>("");//コメント
    const [comments,setComments] = useState<Comment[]>([]);//投稿に対するコメント
    const [reactions,setReactions] = useState<Reaction[]>([]);//コメントのリアクション
    const [loaded,setLoaded] = useState<boolean>();
    const init = async () =>{
        if(loaded)return;
        const id = await GetUserID();
        setUserId(id?id:"0");
        await getComments();
        await getAllCommentsReaction();
        setLoaded(true);
    }
    const reload = async () => {
        await getComments();
        await getAllCommentsReaction();
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

    //リアクションの数
    const getReactionCount = (comment_id:string,rt:keyof Reaction)=>{
        const comment = reactions.filter(r=>r.comment_id===comment_id);
        comment.map(e=>console.log(e[rt]));
        const count:number = comment.filter(r=>r[rt]).length;
        if(!count)return<>0</>;
        return(
            <>
                {count}
            </>
        )
    }
    

    const sendComment = async()=>{
        const req = await CreateComment(post_id,comment);
        if(req)alert("送信完了")
    }

    const toggleReactions = async(comment_id:string,reactionType:string)=>{
        switch(reactionType){
            case "c_reaction_thanks":
                await UpdateCommentReactionThanks(comment_id,user_id);
                break;
            case "c_reaction_heart":
                await UpdateCommentReactionHeart(comment_id,user_id);
                break;
            case "c_reaction_useful":
                await UpdateCommentReactionUseful(comment_id,user_id);
                break;
            case "c_reaction_helpful":
                await UpdateCommentReactionHelpful(comment_id,user_id);
                break;
            default:
                break;
        }
        await reload();
    }

    const isReaction = (comment_id:string,rt:keyof Reaction):boolean=>{
        return reactions.find(r=>(r.comment_id===comment_id&&r.user_id===user_id&&r[rt]))?true:false;
    }
    
    useEffect(()=>{
        init();
    },[])
    

    return(
        <div className="flex flex-col w-[20%] h-screen  bg-[url('img/mokume.png')] p-3 items-center relative">
            {comments?(
                <div className="object-cover w-full h-[90%] flex flex-col items-center gap-10 hidden-scrollbar overflow-auto text-white">
                    {comments.map((comment,i)=>(
                        <div key={i} className="object-cover w-[90%] relative ">
                            <div className={`object-cover w-full relative flex`}>
                                {comment.user_id ===user_id?
                                    (
                                        // 自分のコメント
                                        <div className="object-cover w-full flex relative">
                                            <div className="object-cover flex items-center w-1/12 mr-5">
                                                <Image src={comment.is_public?eyeshow:eyeoff} alt="test" className="w-full"/>
                                            </div>
                                            <div className="object-cover flex justify-end w-3/4 relative">
                                                <div className="object-cover text-nowrap w-full bg-[#A5BBA2] rounded-lg p-3">
                                                    <p className="text-lg font-medium">{comment.comments}</p>
                                                    <Image src={sippo} width={20} height={20} alt="sippo" className="absolute -bottom-3 right-0"/>
                                                </div>
                                            </div>
                                        </div>
                                   ):
                                    (
                                        // 他人のコメント
                                        <div className="object-cover w-full flex relative">
                                            <div className="object-cover w-3/4 bg-[#B8A193] rounded-lg p-3 relative">
                                                <p className="object-cover w-full break-words text-lg font-medium">{comment.comments}</p>
                                                <Image src={sippo_reply} width={30} height={30} alt="sippo" className="absolute -bottom-3 left-0"/>
                                            </div>
                                            <div className="object-cover flex items-center w-1/12">
                                                <Image src={comment.is_public?eyeshow:eyeoff} alt="test" className="w-full"/>
                                            </div>
                                        </div>    
                                    )
                                }
                                
                                
                            </div>
                            <div className="flex ml-3">
                                {
                                    ReactionTypes.map((rt,i)=>(
                                        <button
                                            key={i} 
                                            onClick={()=>toggleReactions(comment.comment_id,rt)} 
                                            className="flex items-center"
                                        >
                                            <Image
                                                src={isReaction(comment.comment_id,rt)?color_reaction_icons[i]:white_reaction_icons[i]}
                                                width={45}
                                                height={45}
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
                <textarea value={comment} onChange={(e)=>setComment(e.target.value)}  className="bg-[#DCD5CD] outline-none focus:h-56 resize-none hidden-scrollbar w-full"/>
                <button className="absolute right-3 bottom-3" onClick={sendComment}><Image src={send} alt="send" width={30} height={30} /></button>
            </div>
            
        </div>
        
    )
}
export {Comments}