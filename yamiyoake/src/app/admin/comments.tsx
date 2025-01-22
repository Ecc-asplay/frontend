import Image from "next/image";
import { useState } from "react";
import comment from "@/app/img/comment.png";
import { ChangeEvent } from "react";
import search from "@/app/img/search-svgrepo-com.png"; 

const testData = [
    {
        userid: 1,
        commentId: 123456781,
        postId: 123456782,
        reportDate: "2024/12/12",
        content: "大変だね",
    },
    {
        userid: 2,
        commentId: 123456783,
        postId: 123456784,
        reportDate: "2024/12/12",
        content: "よかったね",
    },
    {
        userid: 3,
        commentId: 123456785,
        postId: 123456786,
        reportDate: "2024/12/12",
        content: "元気になってね",
    },
    {
        userid: 4,
        commentId: 123456787,
        postId: 123456788,
        reportDate: "2024/12/12",
        content: "お疲れ様",
    }
];

const Comments = () =>{
    const [checked,setChecked] = useState<number[]>([]);
        const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
            const target = e.target;
            const textContent = target.value;
        
            if (!textContent) return; // textContentがnullの場合は何もしない
            const value = Number(textContent);
        
            if (target.checked) {
                // checked配列に値を追加 (新しい配列を作成)
                setChecked([...checked, value]);
            } else {
                // checked配列から値を削除 (新しい配列を作成)
                setChecked(checked.filter((item) => item !== value));
            }
        }
    return (
        <div className="flex w-full h-full">
            <div className="flex flex-col w-[80%] h-screen items-center">
                {/* <div className="flex items-center w-[80%] ">
                    <input type="text" className="w-full h-10 rounded-3xl m-5"/>
                </div> */}

                <div className="flex object-cover w-[80%] h-[6%] items-center mx-10 mt-10 bg-white rounded-full p-1">
                    <input type="text" placeholder="ユーザ名・内容・日時・検索" className="object-cover w-full rounded-xl bg-transparent placeholder:text-lg outline-none pl-10" onChange={(e)=>setKeyword(e.target.value)}/>
                    <Image src={search} width={30} height={30} alt={"search"} className="mr-10"/>
                </div>
                
                <div className="flex items-center justify-around m-5 gap-7 text-[#A5BCA2] font-medium">
                    <select name="" id="" className="rounded-full py-2 px-4 border-4 border-[#A5BCA2]">
                        <option value="">ユーザーごと</option>
                    </select>
                    <select name="" id="" className="rounded-full py-2 px-4 border-4 border-[#A5BCA2]">
                        <option value="">投稿ごと</option>
                    </select>
                    <select name="" id="" className="rounded-full py-2 px-4 border-4 border-[#A5BCA2]">
                        <option value="">日付</option>
                    </select>
                    <select name="" id="" className="rounded-full py-2 px-4 border-4 border-[#A5BCA2]">
                        <option value="">選択済み</option>
                    </select>
                </div>

                <div className="object-cover flex flex-col bg-white w-[90%] rounded-lg h-[60%] ">
                    <div className="flex justify-between items-center">
                        <p className="ml-5 my-3 text-xl text-[#5A6C58] font-bold">通報一覧</p>
                        <p className="mr-5 my-3 text-xl">選択 1/50</p>
                    </div>
                    <div className="object-cover w-full flex flex-col items-center h-full p-5 overflow-y-auto hidden-scrollbar ">
                        <div className="w-[80%] border-2 border-[#CAD9BA] rounded-lg">
                            {
                                testData.map((data,i) => (
                                    <div key={data.commentId} className={`${i%2 === 0 ? "bg-white" : "bg-[#EDF2E7]"} `}>
                                        <table className="w-full border-spacing-0 border-separate rounded-lg text-center text-[#CAD9BA]">
                                            <tbody>
                                                <tr>
                                                    <th>ユーザID</th>
                                                    <th>コメントID</th>
                                                    <th>元投稿ID</th>
                                                    <th>投稿日時</th>
                                                </tr>
                                                <tr>
                                                    <td className="border-t-2 border-[#CAD9BA]">{data.userid}</td>
                                                    <td className="border-t-2 border-[#CAD9BA]">{data.commentId}</td>
                                                    <td className="border-t-2 border-[#CAD9BA]">{data.postId}</td>
                                                    <td className="border-t-2 border-[#CAD9BA]">{data.reportDate}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="border-t-2 border-[#CAD9BA] ">コメント内容</p>
                                        <div className={`flex border-y-2 border-[#CAD9BA] ${i === testData.length - 1 ? "border-b-0" : ""}`}>
                                            <div className="w-[80%]">
                                                <p>{data.content}</p>
                                            </div>
                                            <div className="w-[20%] flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={checked.includes(data.commentId)}
                                                value={data.commentId}
                                                onChange={handleChange}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='w-[20%] h-full bg-white flex flex-col'>
                <p className='m-3 font-bold'>選択ユーザリスト</p>
                <div className='object-cover flex flex-col h-[80%] overflow-y-auto hidden-scrollbar'>
                    {checked.map((e,i)=>(
                        <div key={i} className='flex my-1 items-center justify-around w-full'>
                            <Image src={comment} alt='comment' width={24} height={24} />
                            <p>{e}</p>
                            <input type="checkbox" value={e} onChange={(e)=>handleChange(e)} checked={true} />
                        </div>
                    ))}                   
                </div>
                <div className='object-cover w-full h-[50%] flex flex-col items-center text-2xl font-semibold'>
                    <button className='w-[70%] h-[18%] rounded-xl bg-[#A5BBA2] text-white mb-3'>送信</button>
                    <button className='w-[60%] h-[18%] rounded-xl bg-red-500 text-white'>削除</button>
                </div>
            </div>
        </div>
    );
}
export default Comments;