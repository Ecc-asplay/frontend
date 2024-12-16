"use client"
import { useRouter } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";


const Notifications: React.FC = () => {
    const router = useRouter()
    const navigateTODetail = (notificationType: string) => {
        // router.push(`/setting/noti-detail?notificationType=${encodeURIComponent(notificationType)}`);
        router.push("/setting/noti-detail")
    }

    return(
        <div className="flex flex-col px-6 py-12">
            <h1 className="text-middlebrown font-bold ml-2">通知設定</h1>
            <div className="flex flex-col mt-2 ml-16 px-4 space-y-2">
                <div className="flex items-center justify-between w-full px-4 py-2 cursor-pointer"
                    onClick={() => navigateTODetail('プッシュ')}>
                        <span className="text-basetext">プッシュ通知</span>
                        <span className="text-basetext"><FiChevronRight/></span>
                </div>
                <div className="flex items-center justify-between w-full px-4 py-2 cursor-pointer"
                    onClick={() => navigateTODetail('メール')}>
                        <span className="text-basetext">メール通知</span>
                        <span className="text-basetext"><FiChevronRight/></span>
                </div>
            </div>
        </div>
    )
}


export default Notifications;