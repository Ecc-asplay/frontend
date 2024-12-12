'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { testData, comments, users } from "@/app/test_data";
import { LeftNavigation } from "@/app/components/navigations/left";
import { RightNavigation } from "@/app/components/navigations/right";
import { Items } from "@/app/components/users/Items";
import { Header } from "@/app/components/Header";
import { GetUserData } from "@/app/api/users";
interface UserID {
    params: { id: string | null }
}
interface UserData {
    user_id: string,
    username: string,
    email: string,
    birth: string,
    gender: string,
    is_pricacy: boolean,
    disease: string,
    condition: string,
    hashpassword: string,
    certification: string,
    reset_password_at: string,
    created_at: string,
    update_at: string
}
export default function Users({ params }: UserID) {
    const [id, setId] = useState<string | null>();
    const [userData, setUserData] = useState<UserData>();
    const [year_rate, setYearRate] = useState<number>();
    const [select, setSelect] = useState<number>(0);
    GetUserData();
    useEffect(() => {
        async function getID() {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        }
        getID();
    }, []);

    useEffect(() => {
        if (id) {
            setUserData(users.find(e => e.user_id === id));
        }
    }, [id]);

    useEffect(() => {
        if (userData) {
            const date = new Date();
            const year = date.getFullYear() as number;

            let data = userData.birth.split("-");

            setYearRate(Math.floor((year - (data[0] as unknown as number)) / 10) * 10);
        }
    }, [userData])

    return (
        <div className="flex w-full h-screen">
            <LeftNavigation />
            <div className="object-cover flex flex-col w-[60%] bg-[#E8E7E6] h-screen relative">
                <Header />
                <div className="flex flex-col p-6">
                    <div className="flex gap-7 items-center w-full">
                        <span className="text-4xl text-[#807166]">{userData?.username}</span>
                        <span className="text-2xl text-[#B8A193]">{year_rate}代</span>
                        <span className="text-2xl text-[#B8A193]">{userData?.gender === "male" ? "男性" : "女性"}</span>
                        <span className="flex justify-center items-center bg-[#DCD5CD] rounded-xl w-[15%] h-[5%] p-3 text-[#807166]">{userData?.is_pricacy ? "非公開" : "公開"}</span>
                    </div>
                    <div className="object-cover flex justify-between w-full ">
                        <span>{userData?.email}</span>
                        <Link href={"/edit/1"} className="rounded-md border-2 border-[#B8A193] w-[20%] text-center text-[#B8A193]">編集</Link>
                    </div>
                </div>
                <div className="object-cover flex w-full h-[10%] text-white ">
                    <button type="button" value={0} className={`w-[25%] h-full bg-[#807267] ${select == 0 ? "bg-[#A5BCA2]" : ""}`} onClick={() => { setSelect(0) }}>投稿</button>
                    <button type="button" value={1} className={`w-[25%] h-full bg-[#807267] ${select == 1 ? "bg-[#A5BCA2]" : ""}`} onClick={() => { setSelect(1) }}>コメント</button>
                    <button type="button" value={2} className={`w-[25%] h-full bg-[#807267] ${select == 2 ? "bg-[#A5BCA2]" : ""}`} onClick={() => { setSelect(2) }}>ブックマーク</button>
                    <button type="button" value={3} className={`w-[25%] h-full bg-[#807267] ${select == 3 ? "bg-[#A5BCA2]" : ""}`} onClick={() => { setSelect(3) }}>下書き</button>
                </div>
                <div className="object-cover w-full h-[60%]">
                    <Items user_id={userData?.user_id} index={select}></Items>
                </div>
            </div>
            <RightNavigation />
        </div>
    );
} 