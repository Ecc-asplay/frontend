import { testData,comments,bookmarks } from "@/app/test_data";
import "@/app/components/users/card.css"
interface UserID{
    user_id:string | undefined
}
const User_Drafts:React.FC<UserID> = ({user_id}) =>{
    const user_bookmarks = testData.filter(post => 
        bookmarks.some(bookmark => bookmark.user_id === user_id && bookmark.post_id === post.post_id)
      );
    
    //下書き一覧が無いので投稿で代用しています
    return(
        <div className="grid grid-cols-2 gap-3 p-5 object-cover w-full h-full place-items-center hidden-scrollbar overflow-auto">
            {user_bookmarks.map((post,i)=>(
                    <div key={i} className={`card w-[80%] bg-[#A5BCA2] rounded-md p-3 flex flex-col relative `}>
                        <span className="text[#5A6C58] text-2xl">{post.title}</span>
                        <span className="text-right text-[#CAD9BA]">{post.created_at}</span>
                        <span className="text-[#5A6C58]">{post.content.slice(0,80)}...</span>
                    </div>
                ))
            }
        </div>
    );
}
export {User_Drafts}