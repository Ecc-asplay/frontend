"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";


const GuidelinesChecked: React.FC = () => {

    const [checked, setChecked] = useState(false);
    const router = useRouter();

    const handleChecked = () =>{
        setChecked(!checked)
    }

    const handleConfirmation = () => {
        if (checked) {
            router.push('/registration/regist_email');
        } else {
            alert('ガイドラインを確認してください。'); 
        }
    }

    return(
        <div className="flex flex-col items-center justify-center h-screen bg-basebg">
            <div className="fixed top-0 w-full h-8 bg-headerbrown"></div>
            {/* ガイドライ */}
            <div className="w-1/2 h-64 overflow-y-scroll hidden-scrollbar bg-inputbg p-6 rounded-lg mb-5 mt-10">
                <p className="text-basetext leading-6">
                    皆さまへのお願い<br />
                    このサービスをご利用いただく際に、安全で快適な環境を維持するため、以下のガイドラインを遵守してください。<br />
                    <br />
                    ▼ 個人の体験を尊重しましょう<br />
                    他者の日記や意見を攻撃せず、温かい視点でコミュニケーションを心がけてください。<br />

                    ▼ 断定的な表現や医療関連の発言は慎重に<br />
                    特効薬や治療法に関する発言は慎重にし、医学的な助言は避けてください。<br />
                    

                    ▼ プライバシーと著作権を尊重<br />
                    他者の個人情報を含む内容の投稿は避け、著作権を尊重してください。<br />

                    <br />
                    ■ 日記作成について<br />
                    過激な表現や他者を傷つける内容は削除される可能性があります。<br />

                    ▼ コメントの扱い<br />
                    コメントは登録ユーザーのみ可能で、投稿者が公開可否を決定します。<br />

                    ▼ 不適切な内容への対応<br />
                    攻撃的な内容や不快な投稿は削除される場合があります。通報機能をご利用ください。<br />

                    <br />
                    ■ その他<br />
                    このサイトは、安心して個人の日記を共有できる場です。互いに励まし合い、温かいコミュニティを築きましょう。
                </p>
            </div>

            {/* チャックボックス */}
            <div className="flex items-center mb-5 mt-2">
                <input type="checkbox" id="guidelinechecked" checked={checked} onChange={handleChecked} 
                className="appearance-none flex items-center justify-center h-5 w-5 ml-4 text-white border-2 border-basegreen rounded-sm 
                        checked:bg-basegreen checked:border-transparent checked:before:content-['✔'] checked:before:text-white checked:before:font-extrabold checked:before:text-center checked:before:block focus:outline-none cursor-pointer" />
                <label htmlFor="guidelinechecked" className="text-basetext mr-4 items-center">　ガイドラインを確認しました</label>
            </div>
            {/* 確認ボタン 画面遷移 */}
            <button className="bg-basegreen text-white py-2 px-6 rounded-lg text-lg"
                    onClick={handleConfirmation}>
                確認
            </button>
        </div>
    )
}

export default GuidelinesChecked;