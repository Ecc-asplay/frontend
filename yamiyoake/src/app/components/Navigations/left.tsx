import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import home from "@/app/img/home-line-svgrepo-com.png";
import bell from "@/app/img/bell-svgrepo-com.png";
import gear from "@/app/img/gear-svgrepo-com.png";
import user from "@/app/img/user-svgrepo-com.png";
const LeftNavigation = () =>{
    const [islogin,setLogin] = useState(true);
    return(
        <div className="bg-[url('img/mokume.png')] bg-repeat-round w-[398px] h-screen flex flex-col">
            {
                islogin?
                // ログインしている場合
                <div className="object-cover w-full h-full flex flex-col items-center justify-center text-white text-3xl ">
                    <p className="w-full pl-14 mb-3 "><Link href={"/"} className="flex items-center"><Image src={home} width={45} height={45} alt="home"/>タイムライン</Link></p>
                    <p className="w-full pl-14 my-3"><Link href={"/"} className="flex items-center"><Image src={bell} width={45} height={45} alt="home"/>通知</Link></p>
                    <p className="w-full pl-14 my-3"><Link href={"/"} className="flex items-center"><Image src={gear} width={45} height={45} alt="home"/>設定</Link></p>
                    <p className="w-full pl-14 my-3"><Link href={"/"} className="flex items-center"><Image src={user} width={45} height={45} alt="home"/>プロフィール</Link></p>
                    <p className="w-full pl-14 text-lime-300 mt-3"><Link href={"/"} className="flex items-center"><Image src={user} width={45} height={45} alt="home"/>ガイドライン</Link></p>
                </div>:
                // ログインしていない場合
                <div className="object-cover w-full h-full flex flex-col items-center justify-around">
                    <p>はじめよう</p>
                    <Link href={"/"}><button onClick={()=>{setLogin(!islogin)}}>ログイン</button></Link>
                </div>
            }
        </div>
    );
}
export {LeftNavigation}