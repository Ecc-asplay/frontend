//ポスト一覧
import { SearchInput } from "./searchInput";
import Image from "next/image";
import heart_icon from "@/app/img/heart-svgrepo-com.png";
import comment_icon from "@/app/img/comment-4-svgrepo-com.png";
import bookmark_icon from "@/app/img/bookmark-svgrepo-com.png";
const Posts =()=>{
    const testData = [
        {
            title:"タイトル",
            content:"これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。",
            created_at:"2024-12-12",
            post_id:"1231273",
            comments:3,
        },
        {
            title:"タイトル",
            content:"これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。",
            created_at:"2024-12-12",
            post_id:"1231273",
            comments:3,
        },
        {
            title:"タイトル",
            content:"これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。",
            created_at:"2024-12-12",
            post_id:"1231273",
            comments:3,
        },{
            title:"タイトル",
            content:"これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。ここに入力内容が表示されます。これはサンプルです。",
            created_at:"2024-12-12",
            post_id:"1231273",
            comments:3,
        },
    ]
    return(
        <div className="flex flex-col  bg-[#E8E7E5] w-[60%] items-center ">
            <SearchInput/>
            <hr className="border-2 border-[#B4ACAA] w-full mt-5"/>
            <div className="overflow-y-auto h-screen flex flex-col items-center">
                {
                    testData.map((e,i)=>(
                        <div key={i} className="w-[80%] bg-[#DDD4CF] rounded-md p-3 flex flex-col my-3">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-2xl m-3">{e.title}</span>
                                <div>
                                    <span className="m-3">{e.created_at}</span>
                                    <span className="m-3">{e.post_id}</span>
                                </div>
                            </div>
                            <p>
                                {/*いい感じに2行に収める  */}
                                {e.content.slice(0,87)}
                            </p>
                            <div className="flex justify-between full">
                                <div className="object-cover w-1/2 flex justify-between items-center">
                                    <button className="flex gap-2 ml-3">
                                        <Image src={comment_icon} width={30} height={30} alt="comment icon" />
                                        {e.comments}
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
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export {Posts}