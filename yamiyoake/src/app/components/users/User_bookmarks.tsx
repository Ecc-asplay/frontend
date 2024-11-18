import { testData,comments,bookmarks } from "@/app/test_data";
import Link from "next/link";
import Image from "next/image";
import bookmark_icon from "@/app/img/bookmark-svgrepo-com.png";
import comment_icon from "@/app/img/comment-4-svgrepo-com.png";
import heart_icon from "@/app/img/heart-svgrepo-com.png";
interface UserID{
    user_id:string | undefined
}
const User_Bookmarks:React.FC<UserID> = ({user_id}) =>{
    const user_bookmarks = testData.filter(post => 
        bookmarks.some(bookmark => bookmark.user_id === user_id && bookmark.post_id === post.post_id)
      );
    return(
        <div className="flex flex-col object-cover w-full h-full items-center hidden-scrollbar overflow-auto">
            {user_bookmarks.map((post,i)=>(
                        <div key={i} className={`w-[80%] bg-[#DDD4CF] rounded-md p-3 flex flex-col my-3`}>
                            <Link href={"/posts/" + post.post_id}>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-2xl m-3">{post.title}</span>
                                <div>
                                    <span className="m-3">{post.created_at}</span>
                                    <span className="m-3">{post.post_id}</span>
                                </div>
                            </div>
                            <p>
                                {/*いい感じに2行に収める  */}
                                {post.content.slice(0,87)}
                            </p>
                            <div className="flex justify-between full">
                                <div className="object-cover w-1/2 flex justify-between items-center">
                                    <button className="flex gap-2 ml-3">
                                        <Image src={comment_icon} width={30} height={30} alt="comment icon" />
                                        {comments.filter(c=>post.post_id===c.post_id).length}
                                    </button>
                                    <button className="flex gap-2 mr-10">
                                        <Image  src={heart_icon} width={30} height={30} alt="comment icon" />
                                    </button>
                                </div>
                                <div className="object-cover flex w-1/2 justify-end">
                                    <button >
                                        <Image src={bookmark_icon} width={30} height={20} alt="book mark" />
                                    </button>
                                </div>
                            </div>
                            </Link>
                        </div>
                    ))
                    }
        </div>
    );
}
export {User_Bookmarks}