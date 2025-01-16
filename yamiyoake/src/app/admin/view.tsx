import {Line,LineChart,XAxis,ResponsiveContainer} from 'recharts';
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
        <div className='w-full h-full flex py-12 justify-center '>
            <div className='w-[90%] h-[80%] flex flex-col  items-center bg-[#CAD9BA] rounded-lg'>
                <div className='flex justify-start w-full p-7'>
                    <p>表示設定</p>
                </div>    
                <div className="flex items-center justify-between w-[80%]  ">
                    <input type="text" className="w-full h-10 rounded-3xl m-3"/>
                    <p className='w-[5%]'>表示</p><input className='ml-3' type="checkbox" name="" id="" />
                </div>
                <div className='items-center justify-between m-5 grid grid-flow-col gap-12'>
                    <select name="" id="">
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
                    <div className='bg-white rounded-lg relative m-5 -mr-1 w-[]'>
                        <p className='absolute top-3 left-3'>アナリティクス</p>
                        <ResponsiveContainer width={400} height={200}>
                            <LineChart  data={testData} >
                                <Line type="monotone" dataKey="value" stroke="#E09A96" dot={false} />
                                <XAxis tick={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='w-full p-12 grid grid-cols-2 grid-rows-2 justify-end'>
                        <div className='flex items-center justify-end text-right text-nowrap w-[50%]'>
                            <p className='mr-1'>ストレージ使用量</p>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className='flex items-center justify-end text-right text-nowrap w-[50%]'>
                            <p className='mr-1'>処理性能値</p>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className='flex items-center justify-end text-right text-nowrap w-[50%]'>
                            <p className='mr-1'>アクセス数</p>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className='flex items-center justify-end text-right text-nowrap w-[50%]'>
                            <p className='mr-1'>全て</p>
                            <input type="checkbox" name="" id="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default View;