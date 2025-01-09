import {Line,LineChart,XAxis} from 'recharts';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import Image from 'next/image';
import pluscircle from "@/app/img/plus-circle.png";
import usercircle from "@/app/img/user-circle.png";
const testData = [
    {value:10},
    {value:20},
    {value:30},
    {value:4},
]

const testUsers = [
    {id:123456781,email:"tanaka@gmail.com",name:"田中",permission:"すべて"},
    {id:123456782,email:"suzuki@gmail.com",name:"鈴木",permission:"読・書"},
    {id:123456783,email:"itou@gmail.com",name:"伊藤",permission:"読"},
]
const AdminUsers = () =>{
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
    return(
        <div className='w-full h-full flex'>
            <div className='w-[80%] h-full flex flex-col  items-center'>
                <div className='analitics w-full flex justify-around items-center'>
                    <div className='bg-white rounded-lg relative m-5 -mr-3'>
                        <p className='absolute top-3 left-3'>アナリティクス</p>
                        <LineChart width={400} height={200} data={testData} >
                            <Line type="monotone" dataKey="value" stroke="#E09A96" dot={false} />
                            <XAxis tick={false}/>
                        </LineChart>
                    </div>
                    <div className='bg-white rounded-lg relative m-3'>
                        <p className='absolute top-3 left-3'>アナリティクス</p>
                        <LineChart width={400} height={200} data={testData} >
                            <Line type="monotone" dataKey="value" stroke="#E09A96" dot={false} />
                            <XAxis tick={false}/>
                        </LineChart>
                    </div>
                </div>
                <div className='w-[90%] h-[50%] flex flex-col  bg-white rounded-lg'>
                    <div className='w-full flex justify-between items-center text-xl text-[#A5BBA2] font-bold'>
                        <p className='text-[#5A6C58] m-5'>管理ユーザー一覧</p>
                        <p className='m-5 mr-12'>選択1/3</p>
                    </div>
                    <div className='flex justify-center'>
                        <table className='w-[80%] border-2 border-[#CAD9BA] border-spacing-0 border-separate rounded-lg text-center text-[#CAD9BA]'>
                            <tbody>
                                <tr>
                                    <th>管理ユーザーID</th>
                                    <th>メールアドレス</th>
                                    <th>名前</th>
                                    <th>権限</th>
                                    <th></th>
                                </tr>
                                {testUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="border-t-2 border-[#CAD9BA]">{user.id}</td>
                                        <td className="border-t-2 border-[#CAD9BA]">{user.email}</td>
                                        <td className="border-t-2 border-[#CAD9BA] text-[#5A6C58]">{user.name}</td>
                                        <td className="border-t-2 border-[#CAD9BA]">{user.permission}</td>
                                        <td className="border-t-2 border-[#CAD9BA]">
                                        <input
                                            type="checkbox"
                                            checked={checked.includes(user.id)}
                                            value={user.id}
                                            onChange={handleChange}
                                        />
                                        </td>
                                    </tr>
                                ))}
                            </tbody> 
                        </table>
                    </div>
                    <div className='flex justify-end'>
                        <button className='mr-10'><Image src={pluscircle} alt='plus' width={60} height={60}/></button>
                    </div>
                </div>
            </div>
            <div className='w-[20%] h-full bg-white flex flex-col'>
                <p className='m-3 font-bold'>選択ユーザーリスト</p>
                <div className='object-cover flex flex-col h-full overflow-y-auto hidden-scrollbar'>
                    {checked.map((e,i)=>(
                        <div key={i} className='flex my-1 items-center justify-around w-full'>
                            <Image src={usercircle} alt='usercircle' width={24} height={24} />
                            <p>{e}</p>
                            <input type="checkbox" value={e} onChange={(e)=>handleChange(e)} checked={true} />
                        </div>
                    ))}                   
                </div>
                <div className='object-cover w-full h-[50%] flex flex-col items-center text-xl'>
                    <button className='w-[70%] h-[20%] rounded-xl bg-[#A5BBA2] text-white mb-3'>権限変更</button>
                    <button className='w-[65%] h-[20%] rounded-xl bg-red-500 text-white'>削除</button>
                </div>
            </div>
        </div>
    );
}
export default AdminUsers;