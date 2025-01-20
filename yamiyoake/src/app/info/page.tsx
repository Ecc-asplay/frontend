'use client'
import { LeftNavigation } from "../components/navigations/left";
import { RightNavigation } from "../components/navigations/right";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import Image from "next/image";
import heart from "@/app/img/heart-svgrepo-com.png";
import { GetNotificationsByUser } from "@/app/api/notification";
interface Notification{
    content:string,
    is_Read:boolean
}
export default function info(){
    const [notifications,setNotifications] = useState<Notification[]>([]);
    const [loaded, setLoaded] = useState(false); // ロード済み状態を管理
    const getNotifications = async ()=>{
        if(loaded)return;
        const notification = await GetNotificationsByUser();
        if(!notification)return;
        const data = notification.data;
        if(Array.isArray(data)){
            data.map((e:Notification)=>setNotifications([...notifications,e]));
        }
        setLoaded(true);
    }
    useEffect(() => {     
        getNotifications();
    }, [notifications]);
    return(
        <div className="flex">
            <LeftNavigation/>
            <div className="w-[60%] h-screen relative flex flex-col ">
                <Header/>
                <div className="object-cover w-full h-full overflow-y-auto hidden-scrollbar">
                    {
                        notifications.map((e,i)=>(
                            <div key={i} className={`object-cover w-full h-[17%] border-b border-[#DDD4CF]  flex items-center justify-around ${e.is_Read?"bg-[#DDD4CF]":"bg-white"}`}>
                                <Image src={heart} alt="reaction image" width={50} height={50}/>
                                <p className="w-[30%]">{e.content}が届きました!!</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <RightNavigation/>
        </div>
    );
}