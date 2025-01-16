"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { FiEye } from "react-icons/fi";


const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isShow, setShow] = useState(false);
    const router = useRouter();

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if(password === confirmPassword && password !== '' && confirmPassword !== ''){
            // パスワード再設定処理
            console.log("Password reset successfully.");
            router.push('/login');  
        } else {
            alert("パスワード一致しません");

        }
    }

    // パスワード表示処理
    const handlePassWordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShow(!isShow)
    };
    

    return(
        <div className="flex flex-col justify-center items-center min-h-screen bg-basebg mt-8 space-y-8">
            <div className="fixed top-0 w-full h-8 bg-headerbrown"></div>
            <div className="flex flex-col items-center min-h-screen bg-basebg mt-10 space-y-8">
                <h1 className="text-center text-2xl text-basetext font-bold mb-2 mt-4">パスワード再設定</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 items-center">
                    {/* パスワード入力 */}
                    <div className="relative w-96">
                        <input type={isShow ? "text":"password"} id="password" name="password" placeholder="新しいパスワードを入力" value={password} onChange={(e) => setPassword(e.target.value)} required 
                        className="w-96 px-4 py-3 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown"/>
                        {/* パスワード表示可能ボタン */}
                        <button onClick={handlePassWordVisibility} 
                            // className="absolute inset-y-0 right-3 flex items-center text-middlebrown"
                            className="absolute inset-y-0 top-1/2 right-3 transform -translate-y-1/2 flex items-center text-middlebrown">
                            <FiEye size={24}/>
                        </button>
                    </div>
                    {/* 再入力 */}
                    <div className="relative w-96">
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="確認のためもう一度入力" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required 
                        className="w-96 px-4 py-3 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown"/>
                    </div>
                    {/* 設定ボタン */}
                    <div className="flex justify-center">
                        <button type="submit" className=" w-24 h-9 py-1 bg-basegreen text-basebg font-medium rounded-md">設定する</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ResetPassword;
