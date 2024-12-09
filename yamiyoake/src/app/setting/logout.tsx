"use client";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        // 確認必要f12で
        localStorage.removeItem("token")

        const timer = setTimeout(() => {
            navigate("/")
        },3000)
        
        return () => clearTimeout(timer)
    },[navigate])
    
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