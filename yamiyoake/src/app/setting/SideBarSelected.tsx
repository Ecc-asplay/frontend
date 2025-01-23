import GuidelinesMain from "../guidelines_main/page";
import Blocklist from "./blocklist";
import Contact from "./contact";
import FAQ from "./faq";
import Logout from "./logout";
import Notifications from "./notifications";
import NotiDetailPush from "./noti-detail-push";
import NotiDetailEmail from "./noti-detail-email";

const SideBarSelected:(onselect: (key: string) => void) => Record<string, JSX.Element> = (onselect) =>( {
    
    about:(
        <div className="flex flex-col px-6 py-12 h-screen overflow-y-auto hidden-scrollbar">
            <h1 className="text-middlebrown font-bold ml-2">サイトについて</h1>

            <div className="text-basetext leading-relaxed max-w-screen-md ml-3">
                <p className="mt-4 mb-4 leading-8">
                このサイトは、患者さんやそのサポーターの方々が安全で温かく、匿名で体験を共有できる場を提供することを目的としています。
                日記や経験を共有することで、不安を和らげ、力を分かち合い、すべてのユーザーが理解とサポートを感じられる場所を目指しています。
                </p>

                <h2 className="text-basetext font-semibold">■ 主要機能</h2>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-4">
                    <li className="mb-2">
                        <strong>匿名投稿：</strong>
                        ユーザーは匿名で、自分の闘病日記や生活の感想を自由に書き、共有することができます。
                    </li>
                    <li className="mb-2">
                        <strong>コメント機能：</strong>
                        登録ユーザーは日記にコメントすることができます。すべてのコメントは審査を経てから日記の投稿者に公開されます。
                        投稿者はコメントを他のユーザーに公開するかどうかを選択できます。
                    </li>
                    <li className="mb-2">
                        <strong>リアクションおよびブロック機能：</strong>
                        気に入った日記に「いいね」をつけて、投稿者を応援することができます。
                        また、見たくないユーザーをブロックすることで、自分にとって快適な環境を作ることができます。
                    </li>
                    <li className="mb-2">
                        <strong>通報および審査システム：</strong>
                        不適切な発言や不快な内容については、通報機能を通じて運営側が厳格に管理し、安全で友好的なコミュニティを維持します。
                    </li>
                </ul>

                <h2 className="text-basetext font-semibold">■ ご利用上の注意</h2>
                <ul className="list-disc list-inside pl-4 mt-2 space-y-4">
                    <li className="mb-2">
                        本プラットフォームは個人の経験を共有するためのものであり、特効薬や治療法、民間療法に関する内容は慎重に取り扱ってください。
                    </li>
                    <li className="mb-2">
                        他者への尊重、著作権の遵守、個人情報の保護を心がけてください。
                    </li>
                    <li>
                        発言は友好的で誠実に行い、議論や他者への傷害を避けてください。
                    </li>
                </ul>

                <h2 className="text-basetext font-semibold">■ 私たちのビジョン</h2>
                <p className="mt-2 leading-8">
                    個人の体験を共有することで、お互いに励まし合い、ストレスを軽減する場を目指します。
                    すべてのユーザーが、このコミュニティを通じて温かさや共感、そして力を見つけられるように、一緒に素晴らしい空間を作り上げましょう。
                </p>
                <p className="mt-4 font-semibold text-baseyellow">
                    ご利用いただきありがとうございます！皆様とともに、優しく思いやりのあるコミュニティを築くことを心より願っています。
                </p>
            </div>
        </div>
    ),
    terms:(
        <div className="flex flex-col px-6 py-12 h-screen overflow-y-auto hidden-scrollbar">
            <h1 className="text-middlebrown font-bold ml-2">利用規約</h1>
            {/* 本文 */}
            <div className="text-basetext leading-relaxed max-w-screen-md ml-3">
                <h2 className="font-semibold mt-6">第1条（適用）</h2>
                <p className="mt-2 leading-8">
                    本利用規約（以下、「本規約」といいます。）は、「やみよあけ」（以下、「本サイト」といいます。）が提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。本サイトをご利用いただく際には、本規約に同意したものとみなされます。
                </p>

                <h2 className="font-semibold mt-6">第2条（利用登録）</h2>
                <p className="mt-2 leading-8">
                    １．本サービスをご利用いただくためには、登録手続きを行い、運営が承認する必要があります。<br />
                    ２．登録時には、正確かつ最新の情報を提供してください。虚偽の情報を提供した場合、登録が無効になる場合があります。
                </p>

                <h2 className="font-semibold mt-6">第3条（匿名性とプライバシー保護）</h2>
                <p className="mt-2 leading-8">
                    １．本サイトでは、利用者のプライバシーを保護するため、公開される情報は匿名化されます。<br />
                    ２．利用登録時に提供された個人情報は、運営が厳重に管理し、法令に基づく場合を除き、第三者に開示することはありません。
                </p>

                <h2 className="font-semibold mt-6">第4条（禁止事項）</h2>
                <p className="mt-2 leading-8">
                    利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません：<br />
                    　１．他の利用者に対する誹謗中傷、攻撃、差別的発言<br />
                    　２．虚偽の情報を投稿する行為<br />
                    　３．著作権やその他の知的財産権を侵害する行為<br />
                    　４．他者の個人情報を無断で公開する行為<br />
                    　５．医療的助言や特効薬に関する断定的な表現<br />
                    　６．その他、運営が不適切と判断する行為
                </p>

                <h2 className="font-semibold mt-6">第5条（コメントの取り扱い）</h2>
                <p className="mt-2 leading-8">
                    １．登録ユーザーのみコメントが可能です。<br />
                    ２．コメントはすべて運営が審査を行った後、投稿者に公開されます。<br />
                    ３．投稿者はコメントを公開するかどうかを自由に選択できます。
                    </p>

                <h2 className="font-semibold mt-6">第6条（投稿内容の削除）</h2>
                <p className="mt-2 leading-8">
                以下の場合、運営は事前の通知なく投稿内容を削除できるものとします：<br />
                    　１．本規約に違反する内容<br />
                    　２．公序良俗に反する内容<br />
                    　３．他者を傷つける可能性がある内容<br />
                    　４．運営が不適切と判断した内容
                </p>

                <h2 className="font-semibold mt-6">第7条（免責事項）</h2>
                <p className="mt-2 leading-8">
                    １．本サービスにおける利用者間のトラブルについて、運営は一切責任を負いません。<br />
                    ２．本サービスで提供される情報の正確性、完全性、適用性について、運営は保証しません。<br />
                    ３．運営は、システム障害や不可抗力によるサービス停止に伴う損害について、一切の責任を負いません。
                </p>

                <h2 className="font-semibold mt-6">第8条（サービスの変更・終了）</h2>
                <p className="mt-2 leading-8">
                    運営は、事前の通知なく本サービスの内容を変更または終了することができるものとします。
                </p>

                <h2 className="font-semibold mt-6">第9条（規約の変更）</h2>
                <p className="mt-2 leading-8">
                    運営は、必要に応じて本規約を変更することができます。変更後の規約は、本サイト上に掲示された時点から効力を有するものとします。
                </p>

                <h2 className="font-semibold mt-6">第10条（準拠法および管轄）</h2>
                <p className="mt-2 leading-8">
                    １．本規約の解釈および適用は、日本法に準拠します。<br />
                    ２．本規約に関して紛争が生じた場合、運営所在地を管轄する裁判所を専属的合意管轄とします。
                </p>
            </div>
        </div>
    ),
    privacy:(
        <div className="flex flex-col px-6 py-12 h-screen overflow-y-auto hidden-scrollbar">
            <h1 className="text-middlebrown font-bold ml-2">プライバシーポリシー</h1>
            {/* 本文 */}
            <div className="text-basetext leading-relaxed max-w-screen-md ml-3">
                <h2 className="font-semibold mt-6">第1条（基本方針）</h2>
                <p className="mt-2 leading-8">
                    「やみよあけ」（以下、「本サイト」といいます。）は、ユーザーのプライバシーを尊重し、個人情報の保護を重要な責務と考えています。本プライバシーポリシー（以下、「本ポリシー」といいます。）は、本サイトがユーザーの個人情報をどのように収集、利用、管理、保護するかを説明するものです。
                </p>

                <h2 className="font-semibold mt-6">第2条（適用範囲）</h2>
                <p className="mt-2 leading-8">
                    本ポリシーは、本サイトを利用するすべてのユーザーに適用されます。また、ユーザーが本サイトを利用することで、本ポリシーに同意したものとみなします。
                </p>

                <h2 className="font-semibold mt-6">第3条（収集する情報）</h2>
                <p className="mt-2 leading-8">
                    本サイトは、以下の情報を収集することがあります：<br />
                    　１．利用登録時に提供される情報（例：メールアドレス、ニックネームなど）<br />
                    　２．コメントや日記の投稿内容<br />
                    　３．クッキー（Cookie）やIPアドレス、ブラウザの種類などの技術情報
                </p>

                <h2 className="font-semibold mt-6">第4条（情報の利用目的）</h2>
                <p className="mt-2 leading-8">
                本サイトが収集した情報は、以下の目的で利用します：<br />
                    　１．サービスの提供、運営、改善<br />
                    　２．ユーザーの本人確認<br />
                    　３．コメントの審査および公開の管理<br />
                    　４．法令遵守および不正利用の防止<br />
                    　５．必要に応じたユーザーへの連絡
                </p>

                <h2 className="font-semibold mt-6">第5条（個人情報の管理）</h2>
                <p className="mt-2 leading-8">
                    本サイトは、ユーザーの個人情報を適切に管理し、不正アクセス、紛失、破壊、改ざん、漏洩を防ぐために、以下の措置を講じます：<br />
                    　１．個人情報へのアクセスを制限する管理体制<br />
                    　２．SSLなどのセキュリティ技術を使用した情報通信の暗号化<br />
                    　３．必要に応じてプライバシー保護のための見直し
                    </p>

                <h2 className="font-semibold mt-6">第6条（第三者への提供）</h2>
                <p className="mt-2 leading-8">
                本サイトは、以下の場合を除き、ユーザーの個人情報を第三者に提供することはありません：<br />
                    　１．ユーザーの同意がある場合<br />
                    　２．法令に基づき開示が必要な場合<br />
                    　３．人の生命、身体、または財産の保護が必要で、ユーザーの同意を得ることが困難な場合<br />
                    　４．公的機関からの正当な開示要請がある場合
                </p>

                <h2 className="font-semibold mt-6">第7条（クッキー（Cookie）の使用）</h2>
                <p className="mt-2 leading-8">
                    本サイトでは、ユーザー体験の向上やアクセス解析のためにクッキーを使用することがあります。クッキーの使用を望まない場合、ブラウザの設定を変更することで拒否することができますが、サービスの一部が利用できなくなる場合があります。                
                </p>

                <h2 className="font-semibold mt-6">第8条（ユーザーの権利）</h2>
                <p className="mt-2 leading-8">
                    ユーザーは、以下の権利を有します：<br />
                    　１．自身の個人情報の開示、訂正、削除を求める権利<br />
                    　２．個人情報の利用停止を求める権利
                        　これらの権利を行使する場合は、問い合わせまでご連絡ください。

                </p>

                <h2 className="font-semibold mt-6">第9条（プライバシーポリシーの変更）</h2>
                <p className="mt-2 leading-8">
                    本サイトは、本ポリシーを必要に応じて改定することができます。改定後のポリシーは、本サイト上に掲示された時点で効力を有します。
                </p>
            </div>
        </div>
    ),
    guideline:(
        // 画面導入
        <GuidelinesMain/>

    ),
    faq:(
        // 画面導入
        <div className="h-screen overflow-y-auto hidden-scrollbar">
            <FAQ/>
        </div>
    ),
    notifications:(
        // 通知のカスタマイズ部分　
        <Notifications onselect={onselect}/>
        // <NotiDetail/>
    ),
    blocklist:(
        // 画面導入
        <div>
            <Blocklist/>
        </div>

    ),
    contact:(
        // お問い合わせ
        <Contact/>
    ),
    logout:(
        <div>
            <Logout/>
        </div>
    ),
})

export default SideBarSelected;