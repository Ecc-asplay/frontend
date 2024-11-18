import { testData,comments } from "@/app/test_data";
import Link from "next/link";
import Image from "next/image";
import sippo from "@/app/img/sippo.png";
import back from "@/app/img/back-svgrepo-com.png";
interface UserID{
    user_id:string | undefined
}
const User_Comments:React.FC<UserID> = ({user_id}) =>{
    const user_comments = comments.filter(e=>e.user_id===user_id);
    return(
        <div className="flex flex-col object-cover w-full h-full items-center hidden-scrollbar overflow-auto">
            {user_comments.map((comment,i)=>(
                    <div className="m-3 w-[80%] relative" key={i} >
                        <div className="post bg-[#C6CBBC] flex items-center rounded-t-lg  ">
                            <Image src={back} width={50} height={50} alt="back" className="mx-3"/>
                            <span className="mx-3 text-[#5A6C58] font-bold text-2xl">{testData.find(e=>e.post_id===comment.post_id)?.title}</span>
                            <span className="mx-3">{testData.find(e=>e.post_id===comment.post_id)?.content.slice(0,20)}...</span>
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