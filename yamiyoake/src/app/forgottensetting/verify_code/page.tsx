"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";

const VerifyCode: React.FC = () => {
    const [code, setCode] = useState('');
    const router = useRouter();

    // コード再送処理
    const handleResendCode = () => {
        console.log("Resending verification code...");
        // 再送関連API処理
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // APIなどの処理
        console.log("Sending verification code to:", code);
        router.push('/forgottensetting/reset_password');
      };


    return(
        <div className="flex flex-col justify-center items-center min-h-screen bg-basebg space-y-10">
        <div className="fixed top-0 w-full h-8 bg-headerbrown" />
        
        <h1 className="text-center text-3xl text-basetext font-bold mb-2 mt-4">パスワード再設定</h1>
            <p className="text-center text-lg text-middlebrown mb-2">ご登録されているメールアドレスに認証コードを送信しました。</p>
            {/* コード入力 */}
            <div className="w-full max-w-md space-y-8">
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="認証コードを入力" required
                        className="w-full px-4 py-3 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown " />
            </div>
            {/* 確認ボタン修正する可能性ある */}
            <div className="flex relative justify-center mt-10">
                <button className="w-72 h-12 py-1 bg-basegreen text-basebg font-medium rounded-md text-xl"
                        onClick={handleSubmit}>
                    パスワード再設定に進む
                </button>
            </div>
            {/* 認証コード再送処理 */}
            <div className="flex relative justify-center mt-4">
                <p className="text-basegreen underline cursor-pointer text-base"
                    onClick={handleResendCode}>
                認証コードを再送信する
                </p>
            </div>

            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default VerifyCode;
