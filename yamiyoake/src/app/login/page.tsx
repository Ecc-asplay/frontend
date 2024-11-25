// ヘッダ追加　画面遷移遷移（ガイドライン）　ログイン処理　CSS調整
"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import loginlogo from "@/app/img/login-logo.png";
import axios from "axios";


const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShow, setShow] = useState(false);

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login", {
                email,
                password,
            });
    
            if (response.status === 200) {
                console.log("Login OK: ", response.data);
                alert("Login Done");
            } else {
                console.log("Error: ", response.status);
                alert("Error");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios Error: ", error.response?.data || error.message);
            } else {
                console.error("Error: ", error);
            }
            alert("Error！");
        }
    };

    return(
        <div className="flex flex-col justify-center items-center min-h-screen bg-basebg space-y-16">
            <div className="flex justify-center items-center">            
                <Image src={loginlogo} height={120} width={120} alt="logo" className="mb-6"></Image>
            </div>

            {/* ログイン */}
            <form action="" className="w-full max-w-md space-y-6"> 
                {/* Email入力 */}
                <div className="relative">
                    <input type="email" id="email" name="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required 
                    className="w-96 px-4 py-2 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown "/>
                </div>

                {/* パスワードを入力 */}
                <div className="relative">
                    <input type={isShow ? "text":"password"} id="password" name="password" placeholder="password1234" value={password} onChange={(e) => setPassword(e.target.value)} required 
                    className="w-96 px-4 py-3 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown"/>
                    {/* パスワード表示可能ボタン */}
                    <button onClick={() => setShow(!isShow)} 
                        // className="absolute inset-y-0 right-3 flex items-center text-middlebrown"
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center text-middlebrown">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 90 90"
                            fill="currentColor"
                            className="text-middlebrown"
                        >
                            <g
                            >
                            <path
                                d="M 45 73.264 c -14.869 0 -29.775 -8.864 -44.307 -26.346 c -0.924 -1.112 -0.924 -2.724 0 -3.836 C 15.225 25.601 30.131 16.737 45 16.737 c 14.868 0 29.775 8.864 44.307 26.345 c 0.925 1.112 0.925 2.724 0 3.836 C 74.775 64.399 59.868 73.264 45 73.264 z M 6.934 45 C 19.73 59.776 32.528 67.264 45 67.264 c 12.473 0 25.27 -7.487 38.066 -22.264 C 70.27 30.224 57.473 22.737 45 22.737 C 32.528 22.737 19.73 30.224 6.934 45 z"
                            />
                            <path
                                d="M 45 62 c -9.374 0 -17 -7.626 -17 -17 s 7.626 -17 17 -17 s 17 7.626 17 17 S 54.374 62 45 62 z M 45 34 c -6.065 0 -11 4.935 -11 11 s 4.935 11 11 11 s 11 -4.935 11 -11 S 51.065 34 45 34 z"
                            />
                            </g>
                        </svg>
                    </button>
                </div>
            </form>

            {/* ログインブタン */}
            <div className="flex justify-center mt-10">
                <button onClick={handleLogin} type="submit" className="w-24 h-10 py-1 bg-basegreen text-basebg font-medium rounded-md text-lg">ログイン</button>
            </div>

            {/* 画面遷移 */}
            <div className="flex justify-between mt-4 w-full max-w-md">
                <Link href={"/"} className="text-basegreen">パスワードを忘れた</Link>
                <Link href={"/"} className="text-basegreen">新規登録はこちら</Link>
            </div>
        </div>
    )
}
export default Login;