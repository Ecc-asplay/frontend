'use client'
import { LeftNavigation } from "../../components/navigations/left";
import { RightNavigation } from "../../components/navigations/right";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { notification } from "@/app/test_data";
import Image from "next/image";
import heart from "@/app/img/heart-svgrepo-com.png";
interface UserID{
    params:{id:string | null}
}
export default function info({params}:UserID){
    const [user_id,setUserID] = useState<string>();
    useEffect(() => {
        async function unwrapParams() {
            const resolvedParams = await params;
            if(!resolvedParams.id)return;
            setUserID(resolvedParams.id);
        }
        unwrapParams();
    }, [params]);
    return(
        <div className="flex">
            <LeftNavigation/>
            <div className="w-[60%] h-screen relative flex flex-col ">
                <Header/>
                <div className="object-cover w-full h-full overflow-y-auto hidden-scrollbar">
                    {
                        notification.map((e,i)=>(
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