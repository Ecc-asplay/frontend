import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import home from "@/app/img/home-line-svgrepo-com.png";
import bell from "@/app/img/bell-svgrepo-com.png";
import gear from "@/app/img/gear-svgrepo-com.png";
import user from "@/app/img/user-svgrepo-com.png";
import alert from "@/app/img/alert-square-svgrepo-com.png";

const LeftNavigation = () =>{
    const [islogin,setLogin] = useState(false);
    return(
        <div className="bg-[url('img/mokume.png')] bg-repeat-round w-[20%] h-screen flex flex-col">
            {
                islogin?
                // ログインしている場合
                <div className="object-cover w-full h-full flex flex-col items-center justify-center text-white text-3xl">
                    <p className="w-full pl-14 mb-3 -ml-3"><Link href={"/"} className="flex items-center"><Image src={home} width={45} height={45} alt="home"/>タイムライン</Link></p>
                    <p className="w-full pl-14 my-3 -ml-3"><Link href={"/"} className="flex items-center"><Image src={bell} width={45} height={45} alt="home"/>通知</Link></p>
                    <p className="w-full pl-14 my-3 -ml-3"><Link href={"/"} className="flex items-center"><Image src={gear} width={45} height={45} alt="home"/>設定</Link></p>
                    <p className="w-full pl-14 my-3 -ml-3"><Link href={"/"} className="flex items-center"><Image src={user} width={45} height={45} alt="home"/>プロフィール</Link></p>
                    <p className="w-full pl-14 text-lime-300 mt-3 -ml-3"><Link href={"/"} className="flex items-center"><Image src={alert} width={45} height={45} alt="home"/>ガイドライン</Link></p>
                </div>:
                // ログインしていない場合
                <div className="object-cover w-full h-full flex flex-col items-center justify-around text-2xl text-white">
                    <div className="flex flex-col items-center justify-center text-center py-10">
                        <p>罹患者専用SNS</p>
                        <p className="mb-3">やみよあけ</p>
                        <p className="mt-3">あなたの不安を</p>
                        <p>打ち明けてみよう。</p>
                    </div>
                    <Link href={"/"} className="object-cover rounded-lg bg-[#A5BBA2] w-[70%] h-[10%] flex items-center justify-center shadow-2xl">
                        <button onClick={()=>{setLogin(!islogin)}} >ログイン</button>
                    </Link>
                </div>
            }
        </div>
    );
}
export {LeftNavigation}