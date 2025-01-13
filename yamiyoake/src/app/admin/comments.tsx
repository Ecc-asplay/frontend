import Image from "next/image";
import { useState } from "react";
import comment from "@/app/img/comment.png";
import { ChangeEvent } from "react";
const testData = [
    {
        userid: 1,
        commentId: 123456781,
        postId: 123456782,
        reportDate: "2024/12/12",
        content: "ここに通報内容が表示されるashdjasjdiwjidajlisjdliwjldaijslaldhwhdliajsduwdjai sjldjwl jdalisjdl wjlaij sldijwli jalsjli djwddijwlidjlaisjdlijwldjalsdjlajsdlkjwlidjalksjdljwlijadlksjdlwjdlaisdj",
    },
    {
        userid: 2,
        commentId: 123456783,
        postId: 123456784,
        reportDate: "2024/12/12",
        content: "ここに通報内容が表示されるashdjasjdiwjidajlisjdliwjldaijslaldhwhdliajsduwdjai sjldjwl jdalisjdl wjlaij sldijwli jalsjli djwddijwlidjlaisjdlijwldjalsdjlajsdlkjwlidjalksjdljwlijadlksjdlwjdlaisdj",
    },
    {
        userid: 3,
        commentId: 123456785,
        postId: 123456786,
        reportDate: "2024/12/12",
        content: "ここに通報内容が表示されるashdjasjdiwjidajlisjdliwjldaijslaldhwhdliajsduwdjai sjldjwl jdalisjdl wjlaij sldijwli jalsjli djwddijwlidjlaisjdlijwldjalsdjlajsdlkjwlidjalksjdljwlijadlksjdlwjdlaisdj",
    },
    {
        userid: 4,
        commentId: 123456787,
        postId: 123456788,
        reportDate: "2024/12/12",
        content: "ここに通報内容が表示される"
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
                <div className="flex items-center w-[80%] ">
                    <input type="text" className="w-full h-10 rounded-3xl m-5"/>
                </div>
                
                <div className="flex items-center justify-around m-5 gap-5">
                    <select name="" id="" className="rounded-xl">
                        <option value="">ユーザーごと</option>
                    </select>
                    <select name="" id="" className="rounded-xl">
                        <option value="">投稿ごと</option>
                    </select>
                    <select name="" id="" className="rounded-xl">
                        <option value="">日付</option>
                    </select>
                    <select name="" id="" className="rounded-xl">
                        <option value="">選択済み</option>
                    </select>
                </div>
                <div className="object-cover flex flex-col bg-white w-[90%] rounded-lg h-[60%] ">
                    <div className="flex justify-between items-center">
                        <p className="m-3 text-xl text-[#5A6C58] font-bold">通報一覧</p>
                        <p className="mr-3 text-xl">選択 1/50</p>
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
                <div className='object-cover w-full h-[50%] flex flex-col items-center text-xl'>
                    <button className='w-[70%] h-[20%] rounded-xl bg-[#A5BBA2] text-white mb-3'>送信</button>
                    <button className='w-[65%] h-[20%] rounded-xl bg-red-500 text-white'>削除</button>
                </div>
            </div>
        </div>
    );
}
export default Comments;