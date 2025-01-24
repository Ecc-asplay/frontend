'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { users } from "@/app/test_data";
import { LeftNavigation } from "@/app/components/navigations/left";
import { RightNavigation } from "@/app/components/navigations/right";
import { Header } from "@/app/components/Header";
import { GetUserData,UpdateUserData,UserData,UpdateData } from "@/app/api/users";
import axios from "axios";

export default function Edit() {
    const [id, setId] = useState<string | null>();
    const [userData, setUserData] = useState<UserData>();
    const [year_rate, setYearRate] = useState<number>();
    const [regiformData, setFormData] = useState<UpdateData>({
        email: '',
        password:'',
        gender: 'nocomment',
        is_privacy: true,
        name:{
            lname:'',
            fname:'',
        },
        disease_condition:{
            disease:'',
            condition:''
        }
    });

    const getUserData = async ()=>{
        const data = await GetUserData();
        setUserData(data);
    }

    const updateUserData = async ()=>{
        await UpdateUserData(regiformData)
    }
    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (userData) {
            //年代計算
            const date = new Date();
            const year = date.getFullYear() as number;

            let data = userData.birth.split("-");

            setYearRate(Math.floor((year - (data[0] as unknown as number)) / 10) * 10);

            //初期値
            console.log(userData);
            //生年月日
            const Y:string = userData.birth.split("-")[0],M:string = userData.birth.split("-")[1],D:string = userData.birth.split("-")[2];
            //ファーストネーム、ラストネーム
            const F:string = userData.username.split(" ")[0]?userData.username.split(" ")[0]:"名",
                  L:string = userData.username.split(" ")[1]?userData.username.split(" ")[1]:"姓"; 
            const inital_formdata:UpdateData = {
                email: userData.email,
                password:'',
                gender: userData.gender,
                is_privacy: !userData.is_privacy,
                name:{
                    lname: L,
                    fname: F,
                },
                disease_condition:{
                    disease:"",
                    condition:""
                }
                
            } 
            setFormData(inital_formdata);
        }
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,target:keyof UpdateData) => {
        const { name, value } = e.target;
        if (name === 'is_privacy') {
            //公開設定
            setFormData((prevData) => ({
                ...prevData,
                is_privacy: value === 'true'
            }));

        }else if(target==="name"){
            const child:UpdateData["name"] = {
                lname:regiformData.name.lname,
                fname:regiformData.name.fname
            }
            if(name === "fname")
                child.fname = value;
            else
                child.lname = value; 
            console.log(child);
            setFormData({
                ...regiformData,
                name: child,
            });
        } else {
            //その他
            setFormData({
                ...regiformData,
                [target]: value,
            });
        }
    };
    return (
        <div className="flex w-full ">
            <LeftNavigation />
            <div className="w-[60%] h-screen flex flex-col bg-[#E8E7E6] relative">
                <Header />
                <div className="p-5 mt-5">
                    <div className="flex items-center">
                        <p className="text-5xl mr-3">{userData?.username}</p>
                        <p className="text-3xl text-[#B8A193] mx-3">{year_rate}代</p>
                        <p className="text-3xl text-[#B8A193] mx-3">{userData?.gender === "M"? "男性" : "女性"}</p>
                        <p className="bg-[#DCD5CD] rounded-xl w-[10%] text-center text-xl mx-3">{userData?.is_privacy? "非公開" : "公開"}</p>
                        <button className="bg-[#A5BCA2] rounded-lg w-[10%]  text-center text-xl text-white px-4 py-2 ml-16" onClick={updateUserData}>保存</button>

                    </div>
                    <p className="mt-3 text-[#B8A193] underline">{userData?.email}</p>
                </div>
                {/* 編集内容 */}
                <div className="flex flex-col justify-center items-center object-cover w-full ">
                    {/* ここは第三Step */}
                    <div className="flex flex-col justify-center p-5 rounded-lg object-cover w-full max-w-md space-y-4">
                        {/* 姓名入力 */}
                        <div className="object-cover w-full flex flex-col justify-center items-center space-x-2 ">
                            <p className="text-left font-bold text-2xl w-full  ml-28">氏名</p>
                            <div className="flex p-3 h-16 bg-inputbg rounded-xl object-cover w-[80%]">
                                <div className="flex items-center object-cover w-1/2">
                                    <span className="text-middlebrown px-2">姓</span>
                                    <input type="lname" id="lname" name="lname" placeholder="山田" value={regiformData.name.lname} onChange={(e)=>handleChange(e,"name")} required
                                        className="object-cover w-full bg-transparent focus:outline-none border-none text-basetext placeholder-basetext px-2" />
                                </div>
                                <div className="flex items-center object-cover w-1/2">
                                    <span className="text-middlebrown px-2">名</span>
                                    <input type="fname" id="fname" name="fname" placeholder="太郎" value={regiformData.name.fname} onChange={(e)=>handleChange(e,"name")} required
                                        className="object-cover w-full bg-transparent focus:outline-none border-none text-basetext placeholder-basetext px-2" />
                                </div>
                            </div>
                        </div>

                        {/* 性別選択  */}
                        <div className="flex space-x-3 justify-around">
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="gender" value="M" checked={regiformData.gender === 'M'} onChange={(e)=>handleChange(e,"gender")} required className="hidden" />
                                <span
                                    className={`w-5 h-5 rounded-full border-1 flex items-center justify-center ${regiformData.gender === 'M' ? 'bg-basegreen' : 'bg-middlebrown'
                                        }`}>
                                    <span className="w-4 h-4 rounded-full flex items-center justify-center bg-basebg">
                                        {regiformData.gender === 'M' && <span className="w-3 h-3 rounded-full flex items-center justify-center bg-basegreen"></span>}
                                    </span>
                                </span>
                                <span className="px-0.5 text-basetext">男性</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="gender" value="F" checked={regiformData.gender === 'F'} onChange={(e)=>handleChange(e,"gender")} required className="hidden" />
                                <span
                                    className={`w-5 h-5 rounded-full border-1 flex items-center justify-center ${regiformData.gender === 'F' ? 'bg-basegreen' : 'bg-middlebrown'
                                        }`}>
                                    <span className="w-4 h-4 rounded-full flex items-center justify-center bg-basebg">
                                        {regiformData.gender === 'F' && <span className="w-3 h-3 rounded-full flex items-center justify-center bg-basegreen"></span>}
                                    </span>
                                </span>
                                <span className="px-0.5 text-basetext">女性</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="gender" value="nocomment" checked={regiformData.gender === 'nocomment'} onChange={(e)=>handleChange(e,"gender")} required className="hidden" />
                                <span
                                    className={`w-5 h-5 rounded-full border-1 flex items-center justify-center ${regiformData.gender === 'nocomment' ? 'bg-basegreen' : 'bg-middlebrown'
                                        }`}>
                                    <span className="w-4 h-4 rounded-full flex items-center justify-center bg-basebg">
                                        {regiformData.gender === 'nocomment' && <span className="w-3 h-3 rounded-full flex items-center justify-center bg-basegreen"></span>}
                                    </span>
                                </span>
                                <span className="px-0.5 text-basetext">無回答</span>
                            </label>
                        </div>

                        {/* 公開設定 */}
                        <div className="flex space-x-2 justify-around">
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="is_privacy" value="true" checked={regiformData.is_privacy === true} onChange={(e)=>handleChange(e,"is_privacy")} required className="hidden" />
                                <span
                                    className={`w-5 h-5 rounded-full border-1 flex items-center justify-center ${regiformData.is_privacy === true ? 'bg-basegreen' : 'bg-middlebrown'
                                        }`}>
                                    <span className="w-4 h-4 rounded-full flex items-center justify-center bg-basebg">
                                        {regiformData.is_privacy === true && <span className="w-3 h-3 rounded-full flex items-center justify-center bg-basegreen"></span>}
                                    </span>
                                </span>
                                <span className="px-0.5 text-basetext">公開</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="is_privacy" value="false" checked={regiformData.is_privacy === false} onChange={(e)=>handleChange(e,"is_privacy")} required className="hidden" />
                                <span
                                    className={`w-5 h-5 rounded-full border-1 flex items-center justify-center ${regiformData.is_privacy === false ? 'bg-basegreen' : 'bg-middlebrown'
                                        }`}>
                                    <span className="w-4 h-4 rounded-full flex items-center justify-center bg-basebg">
                                        {regiformData.is_privacy === false && <span className="w-3 h-3 rounded-full flex items-center justify-center bg-basegreen"></span>}
                                    </span>
                                </span>
                                <span className="px-0.5 text-basetext">非公開</span>
                            </label>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <input type="email" id="email" name="email" placeholder="example@email.com" value={regiformData.email} onChange={(e)=>handleChange(e,"email")} required
                                className="px-4 py-2 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown" />
                        </div>
                        {/* password */}
                        <div className="flex flex-col">
                            <input type="password" id="password" name="password" placeholder="new password" value={regiformData.password} onChange={(e)=>handleChange(e,"password")} required
                                className="px-4 py-2 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown" />
                        </div>


                    </div>
                </div>
            </div>
            <RightNavigation />
        </div>
    );
}