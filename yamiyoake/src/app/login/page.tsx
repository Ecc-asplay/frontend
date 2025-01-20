// ヘッダ追加　画面遷移遷移（ガイドライン）　ログイン処理　CSS調整
"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import loginlogo from "@/app/img/login-logo.png";
import { login } from "../api/login";
import {  useRouter } from "next/navigation";
import { FiEye } from "react-icons/fi";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShow, setShow] = useState(false);
    const [loginError,setLoginError] = useState<string>("");
    const router = useRouter();

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        const isLogin = await login(email,password);
        if(!isLogin){
            setLoginError("ログインエラー");
        }else{
            //ログインしたらmainに行く
            router.push("/")
        };  
    };

    // パスワード表示処理
    const handlePassWordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShow(!isShow)
    };

    return(
        <div className="flex flex-col justify-center items-center min-h-screen bg-basebg space-y-12">
            <div className="fixed top-0 w-full h-8 bg-headerbrown"></div>
            <div className="flex justify-center items-center">            
                <Image src={loginlogo} height={120} width={120} alt="logo" className="mb-6"></Image>
            </div>

            {/* ログイン */}
            <form action="" className="w-full max-w-md space-y-6 items-center"> 
                {/* Email入力 */}
                <div className="relative">
                    <input type="email" id="email" name="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required 
                    className="w-full px-4 py-3 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown"/>
                </div>

                {/* パスワードを入力 */}
                <div className="relative w-96">
                    <input type={isShow ? "text":"password"} id="password" name="password" placeholder="password1234" value={password} onChange={(e) => setPassword(e.target.value)} required 
                    className="w-full px-4 py-3 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown"/>
                    {/* パスワード表示可能ボタン */}
                    <button onClick={handlePassWordVisibility} 
                        // className="absolute inset-y-0 right-3 flex items-center text-middlebrown"
                        className="absolute inset-y-0 top-1/2 right-3 transform -translate-y-1/2 flex items-center text-middlebrown">
                        <FiEye size={24}/>
                    </button>
                </div>
            </form>

            {/* ログインボタン */}
            <div className="flex relative justify-center mt-10">
                <span className="absolute -top-10 left-2 w-full text-red-500 ">{loginError}</span>
                <button onClick={handleLogin} type="submit" className="w-36 h-14 py-1 bg-basegreen text-basebg font-medium rounded-md text-xl">ログイン</button>
            </div>

            {/* 画面遷移 */}
            <div className="flex justify-between mt-4 w-full max-w-md">
                <Link href={"/forgottensetting/email_input"} className="text-basegreen">パスワードを忘れた</Link>
                <Link href={"/registration/register"} className="text-basegreen">新規登録はこちら</Link>
            </div>
        </div>
    )
}
export default Login;