import React from 'react';
import {Line,LineChart,XAxis,ResponsiveContainer} from 'recharts';
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
interface AdminUser{
    id:number,
    email:string,
    name:string,
    permission:string
}
const testUsers = [
    {id:123456781,email:"tanaka@gmail.com",name:"田中",permission:"すべて"},
    {id:123456782,email:"suzuki@gmail.com",name:"鈴木",permission:"読・書"},
    {id:123456783,email:"itou@gmail.com",name:"伊藤",permission:"読"},
]
const AdminUsers = () =>{
    //左に移るリスト
    const [checked,setChecked] = useState<AdminUser[]>([]);
    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const target = e.target;
        const textContent = target.value;
    
        if (!textContent) return; // textContentがnullの場合は何もしない
        const user = testUsers.find((user) => user.id === Number(textContent));
    
        if (target.checked) {
            // checked配列に値を追加 (新しい配列を作成)
            setChecked([...checked, user]);
        } else {
            // checked配列から値を削除 (新しい配列を作成)
            setChecked(checked.filter((item) => item.id !== user.id));
        }
    }
    const modal = (target:string)=>{
        const content = document.getElementById(target);
        if(!content)return;
        content.classList.toggle('hidden');
    }
    return(
        <div className='w-full h-full flex'>
            <div className='w-[80%] h-full flex flex-col  items-center'>
                <div className='analitics w-full flex justify-around items-center'>
                    <div className='bg-white rounded-lg relative m-5 -mr-3 w-[40%]'>
                        <p className='absolute top-3 left-3'>アナリティクス</p>
                        <ResponsiveContainer width="100%" height={200} className="p-1">
                            <LineChart  data={testData} >
                                <Line type="monotone" dataKey="value" stroke="#E09A96" dot={false} />
                                <XAxis tick={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='bg-white rounded-lg relative m-3 w-[40%]'>
                        <p className='absolute top-3 left-3'>アナリティクス</p>
                        <ResponsiveContainer width="100%" height={200} className="p-1">
                            <LineChart  data={testData} >
                                <Line type="monotone" dataKey="value" stroke="#E09A96" dot={false} />
                                <XAxis tick={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='w-[90%] h-[50%] flex flex-col  bg-white rounded-lg'>
                    <div className='w-full flex justify-between items-center text-xl text-[#A5BBA2] font-bold'>
                        <p className='text-[#5A6C58] my-3 ml-5'>管理ユーザ一覧</p>
                        <p className='my-3 mr-5'>選択1/3</p>
                    </div>
                    <div className='flex justify-center'>
                        <table className='w-[80%] border-2 border-[#CAD9BA] border-spacing-0 border-separate rounded-lg text-center text-[#CAD9BA] text-lg'>
                            <tbody>
                                <tr>
                                    <th>管理ユーザID</th>
                                    <th>メールアドレス</th>
                                    <th>名前</th>
                                    <th>権限</th>
                                    <th></th>
                                </tr>
                                {testUsers.map((user) => (
                                    <tr key={user.id} className='text-xl my-2'>
                                        <td className="border-t-2 border-[#CAD9BA]">{user.id}</td>
                                        <td className="border-t-2 border-[#CAD9BA]">{user.email}</td>
                                        <td className="border-t-2 border-[#CAD9BA] text-[#5A6C58]">{user.name}</td>
                                        <td className="border-t-2 border-[#CAD9BA]">{user.permission}</td>
                                        <td className="border-t-2 border-[#CAD9BA]">
                                        <input
                                            type="checkbox"
                                            checked={checked.some((item) => item.id === user.id)}
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
                        <button className='mr-10' popoverTarget='add_adminuser' popoverTargetAction='show' onClick={()=>modal("add_adminuser")}><Image src={pluscircle} alt='plus' width={60} height={60}/></button>
                        <div id='add_adminuser' popover='manual' className='hidden backdrop:bg-overlay w-[55%] h-[35%] rounded-lg p-4 flex flex-col '>
                            <p className='text-2xl text-[#5A6C58] my-5 mb-8'>管理ユーザー追加</p>
                            <div className='flex items-center justify-around my-5 h-[20%]'>
                                <div className='flex relative '>
                                    <p className='absolute left-0 -top-5'>名前</p>
                                    <input type="text" className='border-2 border-[#CAD9BA] rounded-md outline-none'/>
                                </div>
                                <div className='flex relative w-2/4'>
                                    <p className='absolute left-0 -top-5'>メールアドレス</p>
                                    <input type="text" className='object-cover w-full  border-2 border-[#CAD9BA] rounded-md outline-none'/>
                                </div>
                                <div className='flex '>
                                    <select name="" id="" className='border-2 border-[#CAD9BA] rounded-md'>
                                        <option value="">すべて</option>
                                        <option value="">書き込み</option>
                                        <option value="">読み取り</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex justify-end w-full h-[20%] mt-3'>
                                <button className='bg-[#CAD9BA] w-[20%] rounded-lg text-xl text-white' popoverTarget='add_adminuser' popoverTargetAction='hide' onClick={()=>modal("add_adminuser")}>追加</button>
                            </div>     
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='w-[20%] h-full bg-white flex flex-col'>
                <p className='m-3 font-bold'>選択ユーザリスト</p>
                <div className='object-cover flex flex-col h-[80%] overflow-y-auto hidden-scrollbar'>
                    {checked.map((e,i)=>(
                        <div key={i} className='flex my-1 items-center justify-around w-full'>
                            <Image src={usercircle} alt='usercircle' width={24} height={24} />
                            <p>{e.id}</p>
                            <input type="checkbox" value={e.id} onChange={(e)=>handleChange(e)} checked={true} />
                        </div>
                    ))}                   
                </div>
                <div className='object-cover w-full h-[70%] flex flex-col items-center text-xl overflow-hidden'>
                    <button className='w-[70%] h-[15%] rounded-xl bg-[#A5BBA2] text-white mb-3 text-2xl font-semibold' popoverTarget='selected_adminusers' popoverTargetAction='show' onClick={()=>modal("selected_adminusers")}>権限変更</button>
                    <div id='selected_adminusers' popover='manual' className='hidden backdrop:bg-overlay w-[75%] h-[65%] rounded-lg p-4 flex flex-col text-[#CAD9BA] '>
                        <p className='text-2xl text-[#5A6C58] my-5 mb-8'>権限変更</p>
                        <div className='flex w-full'>
                            <div className="my-5 border-2 border-[#CAD9BA] rounded-lg w-3/4  overflow-y-auto hidden-scrollbar ml-10">
                                <div className='flex justify-around w-full p-3'>
                                    <div className='flex items-center object-cover w-1/4'>管理ユーザID </div>
                                    <div className='flex items-center object-cover w-1/4'>メールアドレス</div>
                                    <div className='flex items-center object-cover w-1/4'>名前</div>
                                    <div className='flex items-center object-cover w-1/4'>現在の情報</div>
                                </div>
                                
                                {checked.map((e,i)=>(
                                    <div key={i} className='flex justify-around items-center border-t-2 border-[#CAD9BA] w-full p-3 relative'>
                                        <div className='flex items-center object-cover w-1/4'>{e.id}</div>
                                        <div className='flex items-center object-cover w-1/4'>{e.email}</div>
                                        <div className='flex items-center object-cover w-1/4 text-black'>{e.name}</div>
                                        <div className='flex items-center object-cover w-1/4'>{e.permission}</div>
                                    </div>
                                ))}
                            </div>
                            <div className='my-5'>
                                {/* やり方がわからないので代用 */}
                                <div className='flex justify-around w-full p-3 text-transparent'>
                                    空
                                </div>
                                {checked.map((e,i)=>(
                                    <div key={i} className='flex justify-around w-full p-3'>
                                        <select name="" id="" className='border-2 border-[#CAD9BA] rounded-md'>
                                            <option value="">すべて</option>
                                            <option value="">書き込み</option>
                                            <option value="">読み取り</option>
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className='flex justify-end w-full h-[12%] mt-3'>
                            <button className='bg-[#CAD9BA] w-[15%] rounded-lg text-2xl text-white mr-10' popoverTarget='selected_adminusers' popoverTargetAction='hide' onClick={()=>modal("selected_adminusers")}>変更</button>
                        </div>     
                    </div>
                    <button className='w-[60%] h-[15%] rounded-xl text-2xl bg-red-500 text-white font-semibold'>削除</button>
                </div>
            </div>
        </div>
    );
}
export default AdminUsers;