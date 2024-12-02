'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { users } from "@/app/test_data";
import { LeftNavigation } from "@/app/components/navigations/left";
import { RightNavigation } from "@/app/components/navigations/right";
import { Header } from "@/app/components/Header";
import axios from "axios";
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
type FormData = {
    email: string;
    gender: string;
    isPublic: boolean
    birth: {
        year: string;
        month: string;
        day: string;
    };
    fname: string;
    lname: string;
};
export default function Edit({ params }: UserID) {
    const [id, setId] = useState<string | null>();
    const [userData, setUserData] = useState<UserData>();
    const [year_rate, setYearRate] = useState<number>();
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
    }, [userData]);


    const [regiformData, setFormData] = useState<FormData>({
        email: '',
        gender: 'nocomment',
        isPublic: true,
        birth: {
            year: '1925',
            month: '1',
            day: '1',
        },
        lname: '',
        fname: '',
    });

    const router = useRouter();
    const step = 3;

    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(100), (v, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const getDays = (year: number, month: number) => {
        return new Date(year, month, 0).getDate();
    };
    const days = regiformData.birth.year && regiformData.birth.month
        ? Array.from({ length: getDays(Number(regiformData.birth.year), Number(regiformData.birth.month)) }, (_, i) => i + 1)
        : [];


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'year' || name === 'month' || name === 'day') {
            //生年月日
            setFormData((prevData) => ({
                ...prevData,
                birth: {
                    ...prevData.birth,
                    [name]: value,
                },
            }));
        } else if (name === 'isPublic') {
            //公開設定
            setFormData((prevData) => ({
                ...prevData,
                isPublic: value === 'true'
            }));

        } else {
            //その他
            setFormData({
                ...regiformData,
                [name]: value,
            });
        }
        console.log(regiformData)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register Data', FormData);

        try {
            const response = await axios.post("api?/register", regiformData);

            if (response.status === 201) {
                alert("Registration successful!");
                router.push("/");
            } else {
                alert("Registration failed. Please try again");
            }
        } catch (error) {

            console.error("Error: ", error);

            alert("Error！");
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
                        <p className="text-3xl text-[#B8A193] mx-3">{userData?.gender ? "男性" : "女性"}</p>
                        <p className="bg-[#DCD5CD] rounded-xl w-[10%] text-center text-xl mx-3">{userData?.is_pricacy ? "非公開" : "公開"}</p>
                        <Link href={"/users/" + userData?.user_id} className="bg-[#A5BCA2] rounded-lg w-[10%]  text-center text-xl text-white px-4 py-2 ml-16"><button>保存</button></Link>

                    </div>
                    <p className="mt-3 text-[#B8A193] underline">{userData?.email}</p>
                </div>
                {/* 編集内容 */}
                <div className="flex flex-col justify-center items-center object-cover w-full ">
                    {/* ここは第三Step */}
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center p-5 rounded-lg object-cover w-full max-w-md space-y-4">
                        {/* 姓名入力 */}
                        <div className="object-cover w-full flex flex-col justify-center items-center space-x-2 ">
                            <p className="text-left font-bold text-2xl w-full  ml-28">氏名</p>
                            <div className="flex p-3 h-16 bg-inputbg rounded-xl object-cover w-[80%]">
                                <div className="flex items-center object-cover w-1/2">
                                    <span className="text-middlebrown px-2">姓</span>
                                    <input type="lname" id="lname" name="lname" placeholder="山田" value={regiformData.lname} onChange={handleChange} required
                                        className="object-cover w-full bg-transparent focus:outline-none border-none text-basetext placeholder-basetext px-2" />
                                </div>
                                <div className="flex items-center object-cover w-1/2">
                                    <span className="text-middlebrown px-2">名</span>
                                    <input type="fname" id="fname" name="fname" placeholder="太郎" value={regiformData.fname} onChange={handleChange} required
                                        className="object-cover w-full bg-transparent focus:outline-none border-none text-basetext placeholder-basetext px-2" />
                                </div>
                            </div>
                        </div>

                        {/* 生年月日 */}
                        <div className="object-cover w-full flex flex-col items-center justify-center rounded-md p-4 space-x-2">
                            <p className="text-left font-bold text-2xl w-full ml-28">生年月日</p>
                            <div className="flex justify-center p-3 h-16 bg-inputbg rounded-xl object-cover w-[80%]">
                                <div className="flex items-center justify-center w-full">
                                    <span className="text-middlebrown px-2">⌵</span>
                                    <select name="year" value={regiformData.birth.year} onChange={handleChange} required
                                        className="bg-transparent border-none appearance-none focus:outline-none text-basetext">
                                        {years.map((year) => (
                                            <option key={year} value={year} className="text-basetext">
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-middlebrown px-2">年</span>
                                </div>

                                <div className="flex items-center w-full">
                                    <span className="text-middlebrown px-2">⌵</span>
                                    <select name="month" value={regiformData.birth.month} onChange={handleChange} required
                                        className="bg-transparent border-none appearance-none focus:outline-none text-basetext">
                                        {months.map((month) => (
                                            <option key={month} value={month} className="text-basetext">
                                                {month}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-middlebrown px-2">月</span>
                                </div>

                                <div className="flex items-center w-full">
                                    <span className="text-middlebrown px-2">⌵</span>
                                    <select name="day" value={regiformData.birth.day} onChange={handleChange} required
                                        className="bg-transparent border-none appearance-none focus:outline-none text-basetext">
                                        {days.map((day) => (
                                            <option key={day} value={day} className="text-basetext">
                                                {day}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-middlebrown px-2">日</span>
                                </div>
                            </div>
                        </div>

                        {/* 性別選択  */}
                        <div className="flex space-x-3 justify-around">
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="gender" value="male" checked={regiformData.gender === 'male'} onChange={handleChange} required className="hidden" />
                                <span
                                    className={`w-5 h-5 rounded-full border-1 flex items-center justify-center ${regiformData.gender === 'male' ? 'bg-basegreen' : 'bg-middlebrown'
                                        }`}>
                                    <span className="w-4 h-4 rounded-full flex items-center justify-center bg-basebg">
                                        {regiformData.gender === 'male' && <span className="w-3 h-3 rounded-full flex items-center justify-center bg-basegreen"></span>}
                                    </span>
                                </span>
                                <span className="px-0.5 text-basetext">男性</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="gender" value="female" checked={regiformData.gender === 'female'} onChange={handleChange} required className="hidden" />
                                <span
                                    className={`w-5 h-5 rounded-full border-1 flex items-center justify-center ${regiformData.gender === 'female' ? 'bg-basegreen' : 'bg-middlebrown'
                                        }`}>
                                    <span className="w-4 h-4 rounded-full flex items-center justify-center bg-basebg">
                                        {regiformData.gender === 'female' && <span className="w-3 h-3 rounded-full flex items-center justify-center bg-basegreen"></span>}
                                    </span>
                                </span>
                                <span className="px-0.5 text-basetext">女性</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="gender" value="nocomment" checked={regiformData.gender === 'nocomment'} onChange={handleChange} required className="hidden" />
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
                                <input type="radio" name="isPublic" value="true" checked={regiformData.isPublic === true} onChange={handleChange} required className="hidden" />
                                <span
                                    className={`w-5 h-5 rounded-full border-1 flex items-center justify-center ${regiformData.isPublic === true ? 'bg-basegreen' : 'bg-middlebrown'
                                        }`}>
                                    <span className="w-4 h-4 rounded-full flex items-center justify-center bg-basebg">
                                        {regiformData.isPublic === true && <span className="w-3 h-3 rounded-full flex items-center justify-center bg-basegreen"></span>}
                                    </span>
                                </span>
                                <span className="px-0.5 text-basetext">公開</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="isPublic" value="false" checked={regiformData.isPublic === false} onChange={handleChange} required className="hidden" />
                                <span
                                    className={`w-5 h-5 rounded-full border-1 flex items-center justify-center ${regiformData.isPublic === false ? 'bg-basegreen' : 'bg-middlebrown'
                                        }`}>
                                    <span className="w-4 h-4 rounded-full flex items-center justify-center bg-basebg">
                                        {regiformData.isPublic === false && <span className="w-3 h-3 rounded-full flex items-center justify-center bg-basegreen"></span>}
                                    </span>
                                </span>
                                <span className="px-0.5 text-basetext">非公開</span>
                            </label>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <input type="email" id="email" name="email" placeholder="example@email.com" value={regiformData.email} onChange={handleChange} required
                                className="px-4 py-2 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown" />
                        </div>


                    </form>
                </div>
            </div>
            <RightNavigation />
        </div>
    );
}