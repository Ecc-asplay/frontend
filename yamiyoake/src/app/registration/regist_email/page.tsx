"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import RegisterLayout from "../RegisterLayout";


const RegistEmail: React.FC = () => {
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('');
    const router = useRouter();
    // Stepbar
    const step = 2;

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
    
      const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmEmail(e.target.value);
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 他のAPI処理など
        if (email === confirmEmail && email != '' && confirmEmail != '') {
            console.log('Emails match, proceed with registration.');
            // 画面遷移
            router.push('/registration/code_checked')
        } else {
            console.log('Emails do not match, show an error message.');
        }
      };

    return(
        <div className="w-full h-screen relative">
            <div className="fixed top-0 w-full h-8 bg-headerbrown"></div>
            <RegisterLayout step={step}>
                <div className="flex flex-col items-center min-h-screen bg-basebg mt-8 space-y-8">
                    <h1 className="text-center text-2xl text-basetext font-bold mb-2">新規登録</h1>
                    {/* ログイン */}
                    <form onClick={handleSubmit} className="w-full max-w-md space-y-6"> 
                        {/* Email入力 */}
                        <div className="relative">
                            <input type="email" id="email" name="email" placeholder="example@email.com" value={email} onChange={handleEmailChange} required 
                            className="w-96 px-4 py-2 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown "/>
                        </div>
                        {/* 再入力 */}
                        <div className="relative">
                            <input type="email" id="confirmEmail" name="confirmEmail" placeholder="もう一度入力してください" value={confirmEmail} onChange={handleConfirmEmailChange} required 
                            className="w-96 px-4 py-2 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown "/>
                        </div>
                        {/* 確認ボタン */}
                        <div className="flex relative justify-center mt-10">
                            <button type="submit" className="w-44 h-10 py-1 bg-basegreen text-basebg font-medium rounded-md text-lg">
                            確認メールを送信
                            </button>
                        </div>
                    </form>
                </div>
            </RegisterLayout>
        </div>
    )
}

export default RegistEmail;