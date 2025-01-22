import {Line,LineChart,XAxis,ResponsiveContainer} from 'recharts';
import search from "@/app/img/search-svgrepo-com.png"; 
import Image from "next/image";


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
const View = () =>{
    
    return(
        <div className='w-full h-full flex py-12 justify-center'>
            <div className='w-[90%] h-[80%] flex flex-col  items-center bg-[#EFF4EA] rounded-lg'>
                <div className='flex justify-start w-full text-lg ml-16 mt-5 font-semibold'>
                    <p>表示設定</p>
                </div>    

                <div className="flex justify-between align-middle w-[90%] ">
                    <div className="flex w-[70%] h-[80%] items-center mx-10 mt-10 bg-white rounded-full p-1 shadow-lg">
                        <input type="text" placeholder="ユーザ名・内容・日時・検索" className="object-cover w-full rounded-xl bg-transparent placeholder:text-lg outline-none pl-10" />
                        <Image src={search} width={30} height={30} alt={"search"} className="mr-10"/>
                    </div>
                    <div className='flex flex-col items-center text-[#A5BBA2] font-semibold'>
                        <p >表示</p><input className='ml-3' type="checkbox" name="" id="" />
                    </div>
                </div>

                <div className='mt-14 mb-10 grid grid-flow-col gap-12 text-xl text-[#A5BBA2]'>
                    <select name="" id="" className="rounded-full py-2 px-16 border-4 border-[#A5BCA2] shadow-lg">
                        <option value="">タグ</option>
                    </select>
                    <div className='flex items-center'>
                        <p className='mr-1'>ユーザごと</p>
                        <input type="checkbox" name="" id="" />
                    </div>
                    <div className='flex items-center'>
                        <p className='mr-1'>投稿ごと</p>
                        <input type="checkbox" name="" id="" />
                    </div>
                    <div className='flex items-center'>
                        <p className='mr-1'>日付ごと</p>
                        <input type="checkbox" name="" id="" />
                    </div>
                    <div className='flex items-center'>
                        <p className='mr-1'>選択済み</p>
                        <input type="checkbox" name="" id="" />
                    </div>
                    <div className='flex items-center'>
                        <p className='mr-1'>全て</p>
                        <input type="checkbox" name="" id="" />
                    </div>
                </div>
                <div className='analitics w-full flex justify-around items-center'>

                <div className='w-[90%] flex'>
                    <div className='bg-white rounded-lg relative m-5 shadow-xl'>
                        <p className='absolute top-3 left-3'>アナリティクス</p>
                        <ResponsiveContainer width={400} height={200}>
                            <LineChart  data={testData} >
                                <Line type="monotone" dataKey="value" stroke="#E09A96" dot={false} />
                                <XAxis tick={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='w-full p-12 grid grid-cols-2 grid-rows-2 justify-end text-lg'>
                        <div className='flex items-center justify-end text-right text-nowrap w-[50%]'>
                            <p className='mr-2'>ストレージ使用量</p>
                            <input type="checkbox" name="" id=""/>
                        </div>
                        <div className='flex items-center justify-end text-right text-nowrap w-[50%]'>
                            <p className='mr-2'>処理性能値</p>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className='flex items-center justify-end text-right text-nowrap w-[50%]'>
                            <p className='mr-2'>アクセス数</p>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className='flex items-center justify-end text-right text-nowrap w-[50%]'>
                            <p className='mr-2'>全て</p>
                            <input type="checkbox" name="" id="" />
                        </div>
                    </div>

                </div>

                </div>
            </div>
        </div>
    );
}
export default View;