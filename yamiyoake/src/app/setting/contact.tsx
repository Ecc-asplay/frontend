"use client";

import { useState } from "react";

type FormData = {
    category: string;
    subcategory: string;
    email: string;
    fname: string;
    lname: string;
    details: string;
};

const Contact: React.FC = () => {
    const [contactformData, setFormData] = useState<FormData>({
        category: '',
        subcategory: '',
        email: '',
        lname: '',
        fname: '',
        details: '',
    });

    const categories = [
        {
            name: "アカウント関連",
            subcategories: [
              "パスワードを忘れた",
              "アカウントがロックされた/停止された理由を知りたい",
            ],
          },
          {
            name: "ログイン・認証",
            subcategories: [
              "ログインができない",
              "2段階認証の設定や解除についての質問",
              "他人に不正アクセスされた可能性がある",
            ],
          },
          {
            name: "投稿・コンテンツ作成",
            subcategories: [
              "投稿が保存されない/反映されない",
              "投稿の削除や編集方法に関する質問",
            ],
          },
          {
            name: "通知",
            subcategories: ["通知が届かないまたは届きすぎる"],
          },
          {
            name: "プライバシー設定",
            subcategories: ["ブロックについて", "個人情報の削除や非表示について"],
          },
          {
            name: "不適切なコンテンツやユーザー",
            subcategories: [
              "スパムや迷惑行為の報告",
              "不適切な投稿やコメントの通報",
              "他ユーザーによる嫌がらせや誹謗中傷への対応",
            ],
          },
          {
            name: "システムエラー・技術的問題",
            subcategories: [
              "ウェブサイトが正常に動作しない",
              "画面がフリーズする、またはクラッシュする",
              "特定の機能が利用できない",
            ],
          },
          {
            name: "データ管理",
            subcategories: [
              "投稿やアカウントデータのバックアップ/エクスポート",
              "データ削除や完全退会の方法",
              "過去のデータの復元について",
            ],
          },
          {
            name: "機能追加・改善要望",
            subcategories: [
              "新機能の追加リクエスト",
              "既存機能の改善要望",
              "ユーザビリティに関する意見",
            ],
          },
          { name: "その他", subcategories: ["その他"] },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...contactformData,
            [name]: value,
            ...(name === "category" && {subcategory: ""}),
        })
    }


    const handleSubmit = () => {
        console.log("Form Data Submitted: ", contactformData);
        alert("お問い合わせを送信しました！");
        // 詳細設定　APIなど
    }

    return(
        <div className="flex flex-col px-6 py-12">
            <h1 className="text-middlebrown font-bold ml-2">お問い合わせ</h1>
            <div className="ml-4">
                <p className="mt-4 mb-4 text-basetext">
                利用規約・よくある質問をご確認の上でお問い合わせください。
                </p>

                <form action="" className="space-y-1">
                    {/* カテゴリー選択 */}
                    <p className="text-basetext font-semibold">お問い合わせカテゴリー</p>
                    <div className="flex items-center w-full bg-inputbg rounded-md p-3 space-y-1">
                        {/* 選択項目 */}
                        <select name="category" id="category" value={contactformData.category} onChange={handleChange} required 
                                    className="bg-transparent border-none appearance-none focus:outline-none text-basetext">
                            <option className="text-basetext">通報機能について</option>
                            {categories.map((category) => (
                                <optgroup key={category.name} label={category.name}>
                                    {category.subcategories.map((sub) => (
                                        <option key={sub} value={sub} className="text-basetext">
                                            {sub}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>

                        {/* サブ項目選択 */}
                        {/* {contactformData.category && (
                            <>
                                <select name="subcategory" id="subcategory" value={contactformData.subcategory} onChange={handleChange} required 
                                            className="bg-transparent border-none appearance-none focus:outline-none text-basetext">
                                    {categories.find((cat) => cat.name === contactformData.category)
                                    ?.subcategories.map((sub) => (
                                        <option key={sub} value={sub}>
                                            {sub}
                                        </option>
                                    ))
                                    }
                                </select>
                            </>
                        )
                        } */}
                    </div>

                    {/* 名前入力 */}
                    <p className="text-basetext font-semibold">名前</p>
                    <div className="flex justify-between items-center space-x-2 bg-inputbg rounded-md p-2.5">
                        <div className="flex items-center w-full">
                            <span className="text-middlebrown px-2">姓</span>
                            <input type="lname" id="lname" name="lname" placeholder="桃" value={contactformData.lname} onChange={handleChange} required
                                className="bg-transparent focus:outline-none border-none text-basetext placeholder-basetext px-2" />
                        </div>
                        <div className="flex items-center w-full">
                            <span className="text-middlebrown px-2">名</span>
                            <input type="fname" id="fname" name="fname" placeholder="太郎" value={contactformData.fname} onChange={handleChange} required
                                className="bg-transparent focus:outline-none border-none text-basetext placeholder-basetext px-2" />
                        </div>
                    </div>

                    {/* メール */}
                    <p className="text-basetext font-semibold">メールアドレス</p>
                    <div className="flex flex-col">
                        <input type="email" id="email" name="email" placeholder="example@email.com" value={contactformData.email} onChange={handleChange} required
                            className="px-4 py-2 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext placeholder-middlebrown" />
                    </div>

                    {/* 詳細 */}
                    <p className="text-basetext font-semibold">お問い合わせ内容</p>
                    <div className="flex flex-col mb-2">
                        <textarea name="details" id="details" value={contactformData.details} onChange={handleChange} required 
                                    className="px-4 py-2 h-20 rounded-md border-none appearance-none focus:outline-none bg-inputbg text-basetext">

                        </textarea>
                    </div>

                    {/* 送信ボタン */}
                    <div className="flex justify-center mt-2">
                        <button type="submit" className=" w-20 h-9 py-1 mt-3 bg-basegreen text-basebg font-medium rounded-sm"
                                    onClick={handleSubmit}>
                            送信
                        </button>
                    </div>


                </form>

            </div>

        </div>
    )
}

export default Contact;