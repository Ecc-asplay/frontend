"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import RegisterLayout from "../RegisterLayout";



const CodeChecked: React.FC = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const router = useRouter();
    // Stepbar
    const step = 3;

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(e.target.value);
      };

    const handleVerify = () => {
    // 認証コード関連処理
    console.log('Verification code:', verificationCode);
    router.push('/registration/register')
    };

    return(
        <div className="w-full h-screen relative">
            <div className="fixed top-0 w-full h-8 bg-headerbrown" />
            <RegisterLayout step={step}>
                <h1 className="text-center text-3xl text-basetext font-bold mb-10 mt-28">メールアドレス認証</h1>
                {/* コード入力 */}

                {/* TODO:OnClick */}
                <form className="w-full max-w-md space-y-8">
                        <input type="text" value={verificationCode} onChange={handleCodeChange} placeholder="認証コードを入力" required
                            className="w-full px-4 py-3 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown " />
                {/* 確認ボタン修正する可能性ある */}
                <div className="flex relative justify-center mt-10">
                    <button className="w-36 h-12 py-1 bg-basegreen text-basebg font-medium rounded-md text-xl"
                            onClick={handleVerify}>
                        確認
                    </button>
                </div>
            </form>

            </RegisterLayout>
        </div>
    )
}

export default CodeChecked;