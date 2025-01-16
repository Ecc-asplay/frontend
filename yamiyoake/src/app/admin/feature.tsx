
const Feature = () =>{
    
    return(
        <div className='w-full h-full flex py-12 justify-center overflow-y-auto hidden-scrollbar'>
            <div className='w-[90%] h-[50%] flex flex-col  bg-white rounded-lg'>
                <div className="m-5">
                    <p className="text-2xl text-[#5A6C58] font-bold">機能設定</p>
                </div>
                <div className="flex flex-col ml-7">
                    <p className="text-2xl text-[#5A6C58]">通報・お問い合わせ検閲</p>
                    <div className="ml-14 flex items-center justify-between">
                        <p className="text-[#A5BCA2] mt-3">内容が短すぎる通報を表示しない</p>
                        <input type="checkbox" name="" id="" className="mr-10 accent-[#A5BCA2] w-4 h-4 "/>
                    </div>
                    <div className="ml-14 flex items-center justify-between">
                        <p className="text-[#A5BCA2] mt-3">同じユーザからの同じ内容を表示しない</p>
                        <input type="checkbox" name="" id="" className="mr-10 accent-[#A5BCA2] w-4 h-4 " />
                    </div>
                    
                </div>
                <div className="flex flex-col ml-7 mt-5">
                    <p className="text-2xl text-[#5A6C58]">コメント検閲</p>
                    <div className="ml-14 flex items-center justify-between">
                        <p className="text-[#A5BCA2] mt-3">NGワードを含む内容を自動で削除</p>
                        <input type="checkbox" name="" id="" className="mr-10 accent-[#A5BCA2] w-4 h-4 "/>
                    </div>
                    <div className="ml-14 flex items-center justify-between">
                        <p className="text-[#A5BCA2] mt-3">AIによる自動検閲</p>
                        <input type="checkbox" name="" id="" className="mr-10 accent-[#A5BCA2] w-4 h-4 "/>
                    </div>
                     
                </div>
            </div>
            <div className="">

            </div>
        </div>
    );
}
export default Feature;