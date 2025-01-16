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
                <div className='analitics w-full flex justify-around items-center'>
                    <div className='bg-white rounded-lg relative m-5 -mr-3 w-[]'>
                        <p className='absolute top-3 left-3'>アナリティクス</p>
                        <ResponsiveContainer width={400} height={200}>
                            <LineChart  data={testData} >
                                <Line type="monotone" dataKey="value" stroke="#E09A96" dot={false} />
                                <XAxis tick={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default View;