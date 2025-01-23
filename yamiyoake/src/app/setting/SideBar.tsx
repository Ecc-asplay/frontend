import { useState } from "react";
import { FiChevronRight, FiInfo, FiLogOut } from "react-icons/fi";

const SideBar = ({onselect} : {onselect: (key:string) => void}) => {
    const [ selectedKey, setSelectedKey ] = useState<string>("")
    
    const items = [
        { key: "section_about", label: "「やみよあけ」について", isHeader: true },
        { key: "about", label: "サイトについて" },
        { key: "terms", label: "利用規約" },
        { key: "privacy", label: "プライバシーポリシー" },
        { key: "guideline", label: "ガイドライン",isGuide: true },
        { key: "faq", label: "よくある質問" },
        { key: "section_notifications", label: "通知設定", isHeader: true },
        { key: "notifications", label: "通知のカスタマイズ" },
        { key: "section_user", label: "ユーザー関連", isHeader: true },
        { key: "blocklist", label: "ブロックリスト" },
        { key: "contact", label: "お問い合わせ" },
        { key: "logout", label: "ログアウト", isDanger: true },
    ]

    const handleSelect = (key: string) => {
        if (key) {
            // 更新状態
            setSelectedKey(key)
            onselect(key)
        }
    }

    return(
        <div className="mt-6 ">
            <ul className="w-56 p-0">
                {items.map((item) => (
                    <li key={item.key}
                    onClick={() => !item.isHeader && handleSelect(item.key)}
                    // 色設定　選択設定
                    className={`flex items-center justify-between px-4 py-2 ${
                        item.isHeader
                        ? "text-middlebrown font-bold cursor-default"
                        : item.isDanger
                        ? "text-red-700 cursor-pointer"
                        : item.isGuide
                        ? "text-basegreen font-bold cursor-pointer"
                        : "text-basetext cursor-pointer"
                    } ${
                        selectedKey === item.key ? "bg-inputbg font-bold" : ""
                    }
                        `}
                    >
                        {/* タイトル表示 */}
                        <span className={`${item.isHeader ? "" : "ml-3"}`}>
                            {item.label}
                        </span>
                        {/* logo表示 */}
                        {item.isGuide && <span className= "text-basegreen"><FiInfo/></span>}
                        {item.isDanger && <span className="right-2 text-red-700"><FiLogOut/></span>}
                        {!item.isGuide && !item.isDanger && !item.isHeader && (<span className="right-2 text-basetext"><FiChevronRight/></span>)}

                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default SideBar;