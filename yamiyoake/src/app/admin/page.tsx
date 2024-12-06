'use client'
export default function Admin(){
    const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        let target = e.target as HTMLElement;
        if(target.tagName =="P"){
            if(target.parentElement){
                target = target.parentElement;
            }
        }
        const navs = document.querySelectorAll(".nav");
        if(!navs)return;
        navs.forEach(e=>e.classList.remove("bg-[#CAD9BA]"));
        target.classList.add("bg-[#CAD9BA]");
        console.log(target.tagName);
    }
    return(
        <div className="w-full h-screen relative">
            <div className="header object-cover w-full h-[9%] flex items-center  bg-[#A5BCA2] p-7 ">
                <p className="text-white text-xl font-bold">やみよあけ　管理者画面</p>
            </div>
            <div className="flex object-cover w-full h-full">
                {/* 左側 */}
                <div className="object-cover w-[20%] h-full flex flex-col items-center bg-[#A5BCA2] text-white text-left">
                    <button onClick={(e)=>handleClick(e)} className="nav object-cover w-full p-5"><p>ユーザー管理</p></button>
                    <button onClick={(e)=>handleClick(e)} className="nav object-cover w-full p-5"><p>通報内容の確認</p></button>
                    <button onClick={(e)=>handleClick(e)} className="nav object-cover w-full p-5"><p>コメント確認</p></button>
                    <button onClick={(e)=>handleClick(e)} className="nav object-cover w-full p-5"><p>お問い合わせ</p></button>
                    <button onClick={(e)=>handleClick(e)} className="nav object-cover w-full p-5"><p>設定</p></button>
                    <button onClick={(e)=>handleClick(e)} className="nav object-cover w-full p-5 text-red-500"><p>ログアウト</p></button>
                </div>

                {/* 真ん中 */}
                <div className="object-cover w-[60%] h-full bg-[#E8E7E6]">

                </div>

                {/* 右側 */}
                <div className="object-conver w-[20%] h-full ">

                </div>
            </div>
        </div>
    );
}