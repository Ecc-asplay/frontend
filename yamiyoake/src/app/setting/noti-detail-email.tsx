"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";


const NotiDetail: React.FC<{onselect: (key: string) => void}> = ({onselect}) => {
    // const navigate = useNavigate();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isPushEnabled, setIsPushEnabled] = useState(true)
    const [settings, setSettings] = useState({
        notiFromApp: true,
        reactionNoti: true,
        commentNoti: true,
    })


    // 選択関係
    const handleToggle = () => {
        const newPushEnabled = !isPushEnabled
        setIsPushEnabled(newPushEnabled)

        const newSettings = {
            notiFromApp: newPushEnabled,
            reactionNoti: newPushEnabled,
            commentNoti: newPushEnabled,
        }
        setSettings(newSettings)
        
    }

    const handleCheckBoxChange = (key: keyof typeof settings) => {
        // setSettings((prev) => ({
        //     ...prev,
        //     [key]: !prev[key]
        // }))

        const updateSetting = {
            ...settings,
            [key]: !settings[key]
        };

        setSettings(updateSetting);

        const allEnabled = Object.values(updateSetting).every((value) => value);
        setIsPushEnabled(allEnabled);

    }

    return(
        <div className="flex flex-col px-6 py-12 bg-basebg">
            {/* タイトルと前戻り設定 */}
            <h1 className="text-middlebrown font-extrabold flex items-center">
                <span className="cursor-pointer"
                onClick={() => onselect("notifications")} 
                >        
                通知設定
                </span>
                {'　'}<FiChevronRight/>{'　'}{'メール通知'}
            </h1>

            {/* 全処理 */}
            <div className="flex items-center justify-between mb-4 ">
                <span className="text-basetext font-semibold">{'メール通知'}</span>
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

            <div className="h-px bg-middlebrown my-0.5"></div>

            {/* チェックボックス */}
            <div className="divide-y divide-transparent">
                <div className="flex justify-between items-center py-3">
                    <span className="text-basetext">アプリからのお知らせ</span>
                    <input type="checkbox" checked={settings.notiFromApp} onChange={() => handleCheckBoxChange("notiFromApp")} 
                        className="appearance-none flex items-center justify-center h-5 w-5 ml-4 text-white border-2 border-basegreen rounded-sm 
                        checked:bg-basegreen checked:border-transparent checked:before:content-['✔'] checked:before:text-white checked:before:font-extrabold 
                        checked:before:text-center checked:before:block focus:outline-none cursor-pointer"    />
                </div>

                <div className="flex justify-between items-center py-3">
                    <span className="text-basetext">リアクションの通知</span>
                    <input type="checkbox" checked={settings.reactionNoti} onChange={() => handleCheckBoxChange("reactionNoti")} 
                            className="appearance-none flex items-center justify-center h-5 w-5 ml-4 text-white border-2 border-basegreen rounded-sm 
                            checked:bg-basegreen checked:border-transparent checked:before:content-['✔'] checked:before:text-white checked:before:font-extrabold 
                            checked:before:text-center checked:before:block focus:outline-none cursor-pointer"/>
                </div>

                <div className="flex justify-between items-center py-3">
                    <span className="text-basetext">コメント閲覧可能通知</span>
                    <input type="checkbox" checked={settings.commentNoti} onChange={() => handleCheckBoxChange("commentNoti")} 
                            className="appearance-none flex items-center justify-center h-5 w-5 ml-4 text-white border-2 border-basegreen rounded-sm 
                            checked:bg-basegreen checked:border-transparent checked:before:content-['✔'] checked:before:text-white checked:before:font-extrabold 
                            checked:before:text-center checked:before:block focus:outline-none cursor-pointer"/>
                </div>

            </div>

        </div>
    )
}

export default NotiDetail;