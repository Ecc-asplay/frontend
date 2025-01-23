"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const Logout: React.FC = () => {
    const router = useRouter();
    
    useEffect(() => {
        // 確認必要f12で
        sessionStorage.removeItem("acess_token");

        const timer = setTimeout(() => {
            router.push("/")
        },3000)
        
        return () => clearTimeout(timer)
    },[router])
    return(
        <div className="flex flex-col items-center px-6 py-12">
            <p className="text-middlebrown font-semibold">
                ログアウトが完了しました。<br />
                ご利用いただきありがとうございました。<br />
                3 秒後にホームページに戻ります。
            </p>

        </div>
    )
}

export default Logout;