import Image from "next/image";
import { useState } from "react";
import bugle from "@/app/img/bugle.png";
import back from "@/app/img/back-svgrepo-com.png";
import search from "@/app/img/search-svgrepo-com.png"; 

const testData = [
    {
        id: 1,
        reportUserId: 123456781,
        reportedUserId: 123456782,
        reportCount: 2,
        reportDate: "2024/12/12",
        reportContent: "バカ",
    },
    {
        id: 2,
        reportUserId: 123456783,
        reportedUserId: 123456784,
        reportCount: 2,
        reportDate: "2024/12/12",
        reportContent: "あほ",
    },
    {
        id: 3,
        reportUserId: 123456785,
        reportedUserId: 123456786,
        reportCount: 2,
        reportDate: "2024/12/12",
        reportContent: "ドジ",
    },
    {
        id: 4,
        reportUserId: 123456787,
        reportedUserId: 123456788,
        reportCount: 2,
        reportDate: "2024/12/12",
        reportContent: "マヌケ"
    }
];
interface ReportIds {
    report:{
        id:number;
        reportUser: {
            id:number;
            checked:boolean;
        }
        reportedUser:{
            id:number;
            checked:boolean;
        }
    }
}
const Report = () =>{
    const [checked,setChecked] = useState<ReportIds[]>([]);
    const handleChange = (e:ReportIds) =>{
        const target = e;
        const report = target.report;
        console.log(report)
        const { reportUser, reportedUser } = target.report;
    
        // `checked` に現在の report が含まれているか確認
        const isAlreadyChecked = checked.some((item) => item.report.id === report.id);
    
        if (!isAlreadyChecked) {
            // `checked` に存在しない場合、新規追加
            setChecked([...checked, { report }]);
            return;
        }
    
        // 既に存在している場合、条件に応じて処理
        if (
            (reportUser.checked === false && reportedUser.checked === false) || 
            (reportUser.checked === null && reportedUser.checked === null)
        ) {
            // `checked` から削除
            setChecked(checked.filter((item) => item.report.id !== report.id));
        } else {
            // 更新 (再追加)
            setChecked([...checked.filter((item) => item.report.id !== report.id), { report }]);
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
                                    <div key={data.id} className={`${i%2 === 0 ? "bg-white" : "bg-[#EDF2E7]"} `}>
                                        <table className="w-full border-spacing-0 border-separate rounded-xl text-center text-[#CAD9BA]">
                                            <tbody>
                                                <tr>
                                                    <th>通報ユーザID</th>
                                                    <th>通報対象者ユーザID</th>
                                                    <th>被通報回数</th>
                                                    <th>通報日時</th>
                                                </tr>
                                                <tr>
                                                    <td className="border-t-2 border-[#CAD9BA]">{data.reportUserId}</td>
                                                    <td className="border-t-2 border-[#CAD9BA]">{data.reportedUserId}</td>
                                                    <td className="border-t-2 border-[#CAD9BA]">{data.reportCount}</td>
                                                    <td className="border-t-2 border-[#CAD9BA]">{data.reportDate}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="border-t-2 border-[#CAD9BA] ">通報内容　カテゴリ：ユーザ</p>
                                        <div className={`flex border-y-2 border-[#CAD9BA] ${i === testData.length - 1 ? "border-b-0" : ""}`}>
                                            <div className="w-[80%]">
                                                <p>{data.reportContent}</p>
                                            </div>
                                            <div className="w-[20%] flex items-center justify-center">
                                                <input type="checkbox" checked={checked.some((item) => item.report.id === data.id)} onChange={()=>handleChange({report:{id:data.id,reportUser:{id:data.reportUserId,checked:false},reportedUser:{id:data.reportedUserId,checked:false}}})}/>
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
                    {checked.map((data,i)=>(
                        <div key={i} className='flex flex-col my-1 items-center w-full'>
                            <div className="flex items-center">
                                <Image src={bugle} alt='usercircle' width={24} height={24} />
                                <p>{data.report.reportUser.id}</p>
                                <input type="checkbox" onChange={()=>handleChange({report:{id:data.report.id,reportUser:{id:data.report.reportUser.id,checked:!data.report.reportUser.checked},reportedUser:{id:data.report.reportedUser.id,checked:data.report.reportedUser.checked}}})}/>
                            </div>
                            <div className="flex items-center">
                                <Image src={back} alt='usercircle' width={24} height={24} />
                                <p>{data.report.reportedUser.id}</p>
                                <input type="checkbox" onChange={()=>handleChange({report:{id:data.report.id,reportUser:{id:data.report.reportUser.id,checked:data.report.reportUser.checked},reportedUser:{id:data.report.reportedUser.id,checked:!data.report.reportedUser.checked}}})}/>
                            </div>
                        </div>
                    ))}                   
                </div>
                <div className='object-cover w-full h-[50%] flex flex-col items-center text-2xl font-semibold'>
                    <button className='w-[75%] h-[18%] rounded-xl bg-[#A5BBA2] text-white mb-3'>一括メール送信</button>
                    <button className='w-[60%] h-[18%] rounded-xl bg-red-500 text-white'>削除</button>
                </div>
            </div>
        </div>
    );
}
export default Report;