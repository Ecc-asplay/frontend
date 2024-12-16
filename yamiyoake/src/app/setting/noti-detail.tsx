"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const NotiDetail = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isPushEnabled, setIsPushEnabled] = useState(true)
    const [settings, setSettings] = useState({
        notiFromApp: true,
        reactionNoti: true,
        commentNoti: true,
    })

    const notificationType = searchParams.get("notificationType")

    const handleToggle = () => {
        setIsPushEnabled(!isPushEnabled)
    }

    const handleCheckBoxChange = (key: keyof typeof settings) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    return(
        <div className="flex flex-col px-6 py-12 bg-basebg">
            {/* タイトルと前戻り設定 */}
            <h1 className="text-middlebrown font-extrabold">
                <span className="cursor-pointer"
                // 
                        onClick={() => router.back}>
                        通知設定
                </span>
                {'　'}<FiChevronRight/>{'　'}{notificationType}{'通知'}
            </h1>

            {/* 全処理 */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-basetext font-semibold">{notificationType}{'通知'}</span>
                <div className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer 
                                ${isPushEnabled ? "bg-basegreen" : "bg-gray-300"}`}
                      onClick={handleToggle}
                >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform 
                                    ${isPushEnabled ? "translate-x-6" : "translate-x-0"}`}
                    >
                    </div>
                </div>
            </div>

            {/* チェックボックス */}
            <div className="divide-y divide-middlebrown">
                <div className="flex justify-between items-center py-3">
                    <span className="text-basetext">アプリからのお知らせ</span>
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-basegreen"
                            checked={settings.notiFromApp} onChange={() => handleCheckBoxChange("notiFromApp")} 
                    />
                </div>

                <div className="flex justify-between items-center py-3">
                    <span className="text-basetext">リアクションの通知</span>
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-basegreen"
                            checked={settings.reactionNoti} onChange={() => handleCheckBoxChange("reactionNoti")} 
                    />
                </div>

                <div className="flex justify-between items-center py-3">
                    <span className="text-basetext">コメント閲覧可能通知</span>
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-basegreen"
                            checked={settings.commentNoti} onChange={() => handleCheckBoxChange("commentNoti")} 
                    />
                </div>

            </div>

        </div>
    )
}

export default NotiDetail;