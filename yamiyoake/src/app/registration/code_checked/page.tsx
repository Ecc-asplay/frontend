"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import RegisterLayout from "../RegisterLayout";
import { Header } from "../../components/Header";



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
            <div className="fixed top-0 w-full h-8 bg-headerbrown"></div>
            <RegisterLayout step={step}>
                <div className="flex flex-col items-center min-h-screen bg-basebg mt-9 space-y-8">
                    <h1 className="text-center text-2xl text-basetext font-bold mb-12">メールアドレス認証</h1>
                    {/* コード入力 */}
                    <div>
                        <input type="text" value={verificationCode} onChange={handleCodeChange} placeholder="認証コードを入力" required
                                className="w-96 px-4 py-2 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown " />
                    </div>
                    {/* 確認ボタン修正する可能性ある */}
                    <div className="flex relative justify-center mt-10">
                        <button className="w-24 h-10 py-1 bg-basegreen text-basebg font-medium rounded-md text-lg"
                                onClick={handleVerify}>
                            確認
                        </button>
                    </div>
                </div>
            </RegisterLayout>
        </div>
    )
}

export default CodeChecked;