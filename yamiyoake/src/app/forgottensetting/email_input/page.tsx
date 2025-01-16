"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";

const EmailInput: React.FC = () => {
    const [email, setEmail] = useState('')
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // APIなどの処理(コード送信など)
        console.log("Sending verification code to:", email);
        router.push('/forgottensetting/verify_code');
      };

    return(
        <div className="flex flex-col justify-center items-center min-h-screen bg-basebg mt-8 space-y-8">
            {/* 戻り設定追加 */}
            <div className="fixed top-0 w-full h-8 bg-headerbrown"></div>
            <div className="flex flex-col items-center min-h-screen bg-basebg mt-10 space-y-8">
                <h1 className="text-center text-2xl text-basetext font-bold mb-2 mt-4">パスワード再設定</h1>
                <p className="text-center text-lg text-middlebrown mb-2">
                    ご登録されているメールアドレスに認証コードを送信します。
                </p>
                {/* Email入力 */}
                <form onClick={handleSubmit} className="w-full max-w-md space-y-8">
                    <div className="relative flex flex-col justify-center items-center">
                        <input type="email" id="email" name="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required 
                                className="w-96 px-4 py-2 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown "/>
                    </div>
                    {/* 次へボタン */}
                    <div className="flex relative justify-center mt-10">
                        <button type="submit" className="w-24 h-10 py-1 bg-basegreen text-basebg font-medium rounded-md text-lg">
                            次へ
                        </button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default EmailInput;