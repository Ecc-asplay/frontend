import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import home from "@/app/img/home-line-svgrepo-com.png";
import bell from "@/app/img/bell-svgrepo-com.png";
import gear from "@/app/img/gear-svgrepo-com.png";
import user from "@/app/img/user-svgrepo-com.png";
import alert from "@/app/img/alert-square-svgrepo-com.png";
import { GetToken } from "@/app/api/token";
import { GetUserID } from "@/app/api/users";


const LeftNavigation = () => {
    const [islogin, setLogin] = useState(false);
    const [user_id, setUserId] = useState<string>("");
    const getuserId = async () => {
        const id = await GetUserID();
        if (!id) return;
        setUserId(id);
    }
    const getToken = async () => {
        const token = await GetToken();
        if (token) setLogin(true);
    }

    const after3s = (s: boolean) => {
        setTimeout(() => {
            setLogin(!s);
        }, 3000);
    };
    useEffect(() => {
        getToken();
        getuserId();
    }, [])
    return (
        <div className="bg-[url('img/mokume.png')] bg-repeat-round w-[20%] h-screen flex flex-col">
            {
                islogin ?
                    // ログインしている場合
                    <div className="object-cover w-full h-full flex flex-col items-center justify-center text-white text-2xl mb-40 font-semibold">
                        <p className="w-full pl-14 my-3 -ml-3"><Link href={"/"} className="flex items-center"><Image src={home} width={45} height={45} alt="home" /><span className="ml-7">タイムライン</span></Link></p>
                        <p className="w-full pl-14 my-3 -ml-3"><Link href={"/info"} className="flex items-center"><Image src={bell} width={45} height={45} alt="bell" /><span className="ml-7">通知</span></Link></p>
                        <p className="w-full pl-14 my-3 -ml-3"><Link href={"/setting"} className="flex items-center"><Image src={gear} width={45} height={45} alt="gear" /><span className="ml-7">設定</span></Link></p>
                        <p className="w-full pl-14 my-3 -ml-3"><Link href={`/users/${user_id}`} className="flex items-center"><Image src={user} width={45} height={45} alt="user" /><span className="ml-7">プロフィール</span></Link></p>
                        <p className="w-full pl-14 text-lime-300 mt-3 -ml-3"><Link href={"/guidelines_main"} className="flex items-center"><Image src={alert} width={45} height={45} alt="alert" /><span className="ml-7">ガイドライン</span></Link></p>
                    </div> :
                    // ログインしていない場合
                    <div className="object-cover w-full h-full flex flex-col items-center justify-around text-2xl text-white">
                        <div className="flex flex-col items-center justify-center text-center py-10">
                            <p>罹患者専用SNS</p>
                            <p className="mb-3 text-4xl font-bold">やみよあけ</p>
                            <p className="mt-3">あなたの不安を</p>
                            <p>打ち明けてみよう。</p>
                        </div>
                        <Link href={"/login"} className="object-cover rounded-lg bg-[#A5BBA2] w-[65%] h-[9%] flex items-center justify-center shadow-2xl">
                            <button className="font-black text-3xl" onClick={() => { after3s(islogin) }} >ログイン</button>
                        </Link>
                    </div>
            }
        </div>
    );
}
export { LeftNavigation }