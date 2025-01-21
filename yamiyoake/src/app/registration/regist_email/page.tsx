"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import RegisterLayout from "../RegisterLayout";
import { SendVerificationEmail } from "@/app/api/mail";

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
    
      const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        // 他のAPI処理など
        if (email === confirmEmail && email != '' && confirmEmail != '') {
            console.log('Emails match, proceed with registration.');
            const send = await SendVerificationEmail(email);
            // 画面遷移
            if(send)
                router.push('/registration/code_checked')
        } else {
            console.log('Emails do not match, show an error message.');
        }
      };

    return(
        <div className="w-full h-screen relative">
            <div className="fixed top-0 w-full h-8 bg-headerbrown" />
            <RegisterLayout step={step}>
                    <h1 className="text-center text-3xl text-basetext font-bold mb-10 mt-20">新規登録</h1>
                    {/* ログイン */}
                    <form onClick={handleSubmit} className="w-full max-w-md space-y-8 items-center"> 
                        {/* Email入力 */}
                        <div className="relative">
                            <input type="email" id="email" name="email" placeholder="example@email.com" value={email} onChange={handleEmailChange} required 
                            className="w-full px-4 py-3 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown "/>
                        </div>

                        {/* 再入力 */}
                        <div className="relative">
                            <input type="email" id="confirmEmail" name="confirmEmail" placeholder="もう一度入力してください" value={confirmEmail} onChange={handleConfirmEmailChange} required 
                            className="w-full px-4 py-3 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown "/>
                        </div>

                        {/* 確認ボタン */}
                        <div className="flex justify-center">
                            <button type="submit" className="w-60 h-12 py-1 bg-basegreen text-basebg font-medium rounded-md text-xl">確認メールを送信</button>
                        </div>
                    </form>
            </RegisterLayout>
        </div>
    )
}

export default RegistEmail;