"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQ: React.FC = () => {
    const faqData = [
        {
            question: "Q1: サービスを利用するには登録が必要ですか？",
            answer: "はい、一部の機能をご利用いただくには登録が必要です。登録には本人確認を行いますが、公開される際は匿名で投稿いただけます。",
        },
        {
            question: "Q2: 匿名投稿は本当に匿名ですか？",
            answer: "はい、匿名性を重視しています。投稿者の個人情報は公開されません。ただし、運営チームは規約違反や問題が発生した際に、必要に応じて確認を行う場合があります。",
        },
        {
            question: "Q3: 投稿内容が削除される場合がありますか？",
            answer: "他のユーザーに不快感を与える可能性がある内容や、ガイドラインに反する内容は削除の対象となる場合があります。",
        },
        {
            question: "Q4: コメントはどのように公開されますか？",
            answer: "登録ユーザーのみがコメント可能で、コメントは投稿者が承認した場合にのみ公開されます。公開するかどうかは投稿者の判断です。",
        },
        {
            question: "Q5: 不適切な内容を見つけた場合はどうすればいいですか？",
            answer: "不適切な投稿やコメントを見つけた場合は、通報機能をご利用ください。運営チームが内容を確認し、必要に応じて対応いたします。",
        },
        {
            question: "Q6: 投稿した日記やコメントを削除することはできますか？",
            answer: "はい、投稿者は自身の投稿やコメントを削除することが可能です。ただし、一度削除した内容は元に戻せませんのでご注意ください。",
        },
        {
            question: "Q7: 医療に関するアドバイスは投稿できますか？",
            answer: "個人的な経験の共有は可能ですが、医学的なアドバイスや断定的な表現はお控えください。誤解を招く恐れがあるため、慎重に投稿してください。",
        },
        {
            question: "Q8: サービスの利用は無料ですか？",
            answer: "基本的なサービスは無料でご利用いただけます。ただし、将来的に一部の機能を有料化する可能性があります。",
        },
        {
            question: "Q9: パスワードを忘れた場合はどうすればいいですか？",
            answer: "ログイン画面の「パスワードを忘れた場合」リンクから再設定が可能です。登録したメールアドレスを使用して、新しいパスワードを設定してください。",
        },
        {
            question: "Q10: プライバシーはどのように保護されていますか？",
            answer: "本サービスでは、ユーザーのプライバシーを最優先に考えています。詳しくはプライバシーポリシーをご確認ください。",
        },

    ]
    return(
        <div className="flex flex-col px-6 py-12">
            <h1 className="text-middlebrown font-bold ml-2">よくある質問</h1>
            <div className="w-full max-w-2xl">
                {faqData.map((item, index) => (
                    <Accordion key={index} question={item.question} answer={item.answer} />
                ))
                }
            </div>
        </div>
    )
}

interface AccordionData{
    question: string;
    answer: string;
}

// 問題表示設定
const Accordion: React.FC<AccordionData> = ({question, answer}) => {
    
    const [isOpen, setOpen] = useState(false);

    return(
        <div className="ml-3">
            {/* 質問 */}
            <button
                className="w-full text-left text-basetext font-semibold py-2 focus:outline-none flex justify-between items-center"
                onClick={()=> setOpen(!isOpen)}
            >
                {question}
                <span className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
                    　<FiChevronDown/>　
                </span>
            </button>
            {/* 答え */}
            {isOpen && <p className="text-basetext mt-2 leading-8">{answer}</p>}
        </div>
    )
}

export default FAQ;