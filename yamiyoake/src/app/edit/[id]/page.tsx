'use client'
import React from "react";
import { useState,useEffect } from "react";
import Link from "next/link";
import { users } from "@/app/test_data";
import { LeftNavigation } from "@/app/components/navigations/left";
import { RightNavigation } from "@/app/components/navigations/right";
interface UserID{
    params:{id:string|null}
}
interface UserData{
    user_id:string,
    username:string,
    email:string,
    birth:string,
    gender:string,
    is_pricacy:boolean,
    disease:string,
    condition:string,
    hashpassword:string,
    certification:string,
    reset_password_at:string,
    created_at:string,
    update_at:string
}
export default function Edit({params}:UserID){
    const [id,setId] = useState<string | null>();
    const [userData,setUserData] = useState<UserData>();
    const [year_rate,setYearRate] = useState<number>();
    useEffect(()=>{
        async function getID(){
            const resolvedParams = await params;
            setId(resolvedParams.id);
        }
        getID();
    },[]);
    useEffect(()=>{
        if(id){
            setUserData(users.find(e=>e.user_id===id));
        }
    },[id]);

    useEffect(()=>{
        if(userData){
            const date = new Date();
            const year = date.getFullYear() as number;

            let data = userData.birth.split("-");
            
            setYearRate(Math.floor((year - (data[0] as unknown as number)) / 10) * 10);
        }
    },[userData])

    return(
        <div className="flex w-full ">
            <LeftNavigation/>
            <div className="w-[60%] h-screen flex flex-col bg-[#E8E7E6]">
                <hr className="w-full h-[7%] bg-[#B8A193]"/>
                <div className="p-5">
                    <div className="flex items-center">
                        <p className="text-5xl mr-3">{userData?.username}</p>
                        <p className="text-3xl text-[#B8A193] mx-3">{year_rate}代</p>
                        <p className="text-3xl text-[#B8A193] mx-3">{userData?.gender?"男性":"女性"}</p>
                        <p className="bg-[#DCD5CD] rounded-xl w-[10%] text-center text-xl mx-3">{userData?.is_pricacy?"非公開":"公開"}</p>
                        <Link href={"/users/" + userData?.user_id} className="bg-[#A5BCA2] rounded-lg w-[10%]  text-center text-xl text-white px-4 py-2 ml-16"><button>保存</button></Link>
                        
                    </div>
                    <p className="mt-3 text-[#B8A193] underline">{userData?.email}</p>
                </div>
                <div>

                </div>
            </div>
            <RightNavigation/>
        </div>
    );
}