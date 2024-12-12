// ヘッダ追加　画面遷移遷移（メイン）　API処理　CSS微調整
"use client"
import { useState } from "react";
import RegisterLayout from "./RegisterLayout";
import { useRouter } from "next/navigation";
import { Header } from "../components/Header";
import {register} from "@/app/api/register";
type FormData = {
    email: string;
    password: string;
    passwordcheck: string;
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

const Register: React.FC = () => {
    const [regiformData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        passwordcheck: '',
        gender: '',
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
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register Data', FormData);
        // パスワード一致性確認
        if (regiformData.password !== regiformData.passwordcheck) {
            alert("パスワード一致しません");
            return;
        }
        try {
            const Username:string = regiformData.fname + regiformData.lname;
            const Email:string = regiformData.email;
            //2000-10-10形
            //10月以下だったら09月みたいにする
            const Birth:string = regiformData.birth.year + "-" + 
                                (Number(regiformData.birth.month) >= 10 ?regiformData.birth.month:"0"+regiformData.birth.month) + "-" + 
                                (Number(regiformData.birth.day) >= 10 ?regiformData.birth.day:"0"+regiformData.birth.day); 
            const Gender:string = regiformData.gender;
            const Password:string = regiformData.password; 
            const response = await register(Username,Email,Birth,Gender,Password);
            if (response) {
                alert("登録完了!");
                router.push("/");
            } else {
                alert("登録できませんでした。確認してください。");
            }
        } catch (error) {

            console.error("Error: ", error);
            alert("Error！");
        }

    };

    return (
        <div className="w-full h-screen relative">
            <Header />
            <RegisterLayout step={step}>
                
                <div className="flex justify-center min-h-screen ">
                    {/* ここは第三Step */}
                    <form onSubmit={handleSubmit} className="p-5 rounded-lg w-full max-w-md space-y-4">
                        {/* Email */}
                        <div className="flex flex-col">
                            <input type="email" id="email" name="email" placeholder="example@email.com" value={regiformData.email} onChange={handleChange} required
                                className="px-4 py-2 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown" />
                        </div>

                        {/* Password */}
                        <div className="bg-inputbg rounded-md p-4 space-y-2">
                            <div className="flex flex-col">
                                <input type="password" id="password" name="password" placeholder="パスワードを入力" value={regiformData.password} onChange={handleChange} required
                                    className="bg-transparent border-none appearance-none focus:outline-none text-basetext placeholder-middlebrown" />
                            </div>

                            <div className="h-px bg-middlebrown my-1"></div>

                            <div className="flex flex-col">
                                <input type="passwordcheck" id="passwordcheck" name="passwordcheck" placeholder="もう一回入力お願いします" value={regiformData.passwordcheck} onChange={handleChange} required
                                    className="bg-transparent border-none appearance-none focus:outline-none text-basetext placeholder-middlebrown" />
                            </div>
                        </div>

                        {/* TODO性別選択  */}
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

                        {/* 生年月日 */}
                        <div className="bg-inputbg rounded-md p-4 space-y-2">
                            <div className="flex justify-between items-center space-x-4">
                                <div className="flex items-center w-full">
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


                            <div className="h-px bg-middlebrown my-1"></div>

                            {/* 姓名入力 */}
                            <div className="flex justify-between items-center space-x-2">
                                <div className="flex items-center w-full">
                                    <span className="text-middlebrown px-2">姓</span>
                                    <input type="lname" id="lname" name="lname" placeholder="山田" value={regiformData.lname} onChange={handleChange} required
                                        className="bg-transparent focus:outline-none border-none text-basetext placeholder-basetext px-2" />
                                </div>
                                <div className="flex items-center w-full">
                                    <span className="text-middlebrown px-2">名</span>
                                    <input type="fname" id="fname" name="fname" placeholder="太郎" value={regiformData.fname} onChange={handleChange} required
                                        className="bg-transparent focus:outline-none border-none text-basetext placeholder-basetext px-2" />
                                </div>
                            </div>
                        </div>

                        {/* 登録ボタン */}
                        <div className="flex justify-center">
                            <button type="submit" className=" w-16 h-9 py-1 bg-basegreen text-basebg font-medium rounded-sm">登録</button>
                        </div>

                    </form>
                </div>
            </RegisterLayout>
        </div>
    );
};

export default Register;



