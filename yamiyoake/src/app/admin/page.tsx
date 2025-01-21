'use client'
import React from "react";
import Image from "next/image";
import waring from "@/app/img/admin/warning.png";
import user from "@/app/img/admin/user.png";
import logout from "@/app/img/admin/log-out.png";
import gear from "@/app/img/admin/gear.png";
import phone from "@/app/img/admin/phone.png";
import comment from "@/app/img/admin/comment.png";
import SelectedPage from "./selectedPage";
import { useState,useEffect } from "react";
import {FiChevronDown} from "react-icons/fi";
export default function Admin(){
    const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        let target = e.target as HTMLElement;
        if(target.tagName =="P" || target.tagName =="IMG"){
            if(target.parentElement){
                target = target.parentElement;
            }
        }
        const navs = document.querySelectorAll(".nav");
        if(!navs)return;
        navs.forEach(e=>e.classList.remove("bg-[#CAD9BA]"));
        target.classList.add("bg-[#CAD9BA]");
        setSelect(target.id);
    }
    const [isOpen,setIsOpen] = useState(false);
    //ユーザー管理から0,通報内容の確認から1,コメント確認から2,お問い合わせから3,設定から4,ログアウトから5
    const [select,setSelect] = useState("adminUsers");

    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
        setIsClient(true)
    }, [])
    return(
        <div className="w-full h-screen relative">
            <div className="header object-cover w-full h-[9%] flex items-center  bg-[#A5BCA2] p-7 ">
                <p className="text-white text-xl font-bold">やみよあけ　管理者画面</p>
            </div>
            <div className="flex object-cover w-full h-full">
                {/* 左側 */}
                <div className="object-cover w-[17%] h-full flex flex-col items-center bg-[#A5BCA2] text-white text-left text-2xl font-bold">
                    <button onClick={(e)=>handleClick(e)} className="nav flex justify-between items-center object-cover w-full ml-3 p-5 bg-[#CAD9BA]" id="adminUsers"><p>ユーザー管理</p><Image src={user} alt="icon" width={30} height={30}/></button>
                    <button onClick={(e)=>handleClick(e)} className="nav flex justify-between items-center object-cover w-full ml-3 p-5" id="report" ><p>通報内容の確認</p><Image src={waring} alt="icon" width={30} height={30}  /></button>
                    <button onClick={(e)=>handleClick(e)} className="nav flex justify-between items-center object-cover w-full ml-3 p-5" id="comment" ><p>コメント確認</p><Image src={comment} alt="icon" width={30} height={30}  /></button>
                    <button onClick={(e)=>handleClick(e)} className="nav flex justify-between items-center object-cover w-full ml-3 p-5" id="contact" ><p>お問い合わせ</p><Image src={phone} alt="icon" width={30} height={30}  /></button>
                    <button onClick={(e)=>{handleClick(e); setIsOpen(!isOpen);}} className="nav flex justify-between items-center object-cover w-full ml-3 p-5" id="view"><p className="flex items-center"><FiChevronDown/><span className="pl-2">設定</span></p><Image src={gear} alt="icon" width={30} height={30}  /></button>
                    <button onClick={(e)=>handleClick(e)} className={`nav flex justify-between items-center object-cover w-full ml-12 p-5 text-xl ${isOpen?"block":"hidden"}`} id="view" ><p>表示</p></button>
                    <button onClick={(e)=>handleClick(e)} className={`nav flex justify-between items-center object-cover w-full ml-12 p-5 text-xl ${isOpen?"block":"hidden"}`} id="feature" ><p>機能</p></button>
                    <button onClick={(e)=>handleClick(e)} className="nav flex justify-between items-center object-cover w-full ml-3 p-5 text-red-500" id="logout"><p>ログアウト</p><Image src={logout} alt="icon" width={30} height={30}  /></button>
                </div>

                {/* 押されたやつ */}
                <div className="object-cover w-[80%] h-full bg-[#E8E7E6]">
                    {isClient?SelectedPage[select]:""}
                </div>

            </div>
        </div>
    );
}