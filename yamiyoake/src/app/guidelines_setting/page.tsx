import loginlogo from "@/app/img/login-logo.png";
import Image from "next/image";


const GuidelinesSetting: React.FC = () => {
    return (
        <div className="flex flex-col overflow-auto hidden-scrollbar h-screen items-center bg-basebg px-6">
            {/* ロゴ */}
            <div className="flex justify-center items-center mt-16 mb-8">
                <Image src={loginlogo} height={120} width={120} alt="logo"></Image>
            </div>

            {/* タイトル　副タイトル */}
            <h1 className="text-basetext font-bold text-3xl">やみよあけ ガイドライン</h1>
            <h2 className="text-baseyellow font-black text-xl m-5">当サービスをご利用の皆さまへのお願い</h2>

            {/* ガイドライン本文 */}
            <div className="mx-6 mt-6 mb-32 text-lg leading-relaxed max-w-screen-lg text-basetext">
                <p className="font-black">皆さまへのお願い</p>
                <p className="mt-2 px-4">皆さまが安全で快適にこのサービスをご利用いただけるよう、以下のガイドラインを設けました。本サービスをご利用の際には、このルールをお守りいただければ幸いです。</p>
                <br />
                <p className="font-black">▼ 個人の体験を尊重しましょう</p>
                <p className="mt-2 px-4">・他者の日記や意見に対する攻撃や批判はお控えください。</p>
                <p className="mt-2 px-4">・自分の視点だけで他者を評価することなく、温かい視点でコミュニケーションを心がけてください。</p>
                <br />
                <p className="font-black">▼ 断定的な表現や医療関連の発言は慎重に</p>
                <p className="mt-2 px-4">・特効薬や治療法、偏方などに関する発言は慎重にお願いします。個人的な意見や経験の共有は問題ありませんが、医学的な助言や断定的な表現は避けましょう。</p>
                <br />
                <p className="font-black">▼ プライバシーと著作権を尊重</p>
                <p className="mt-2 px-4">・他者の個人情報を含む内容（例：名前や連絡先、病歴など）は投稿しないでください。</p>
                <p className="mt-2 px-4">・写真や文章を投稿する際は、著作権や肖像権を侵害しないように十分ご注意ください。</p>
                <br />
                <p className="font-black">■ 日記作成について</p>
                <p className="mt-2 px-4">このサイトは、個人の日記や経験を匿名で安心して共有する場です。内容に過激な表現や他者を傷つける可能性のある表現が含まれる場合は削除対象となります。</p>
                <p className="font-black">▼ コメントの扱い</p>
                <p className="mt-2 px-4">・登録ユーザーのみコメントが可能です。コメントはすべて事前に審査され、日記投稿者に公開されます。</p>
                <p className="mt-2 px-4">・投稿者がコメントを公開するかどうかを決定します。</p>
                <br />
                <p className="font-black">▼ 不適切な内容への対応</p>
                <p className="mt-2 px-4">・他者への攻撃、差別的発言、誹謗中傷、または暴力的・不快な内容が投稿された場合、該当する内容は削除される場合があります。</p>
                <p className="mt-2 px-4">・投稿やコメントに問題がある場合は、通報機能をご利用ください。運営チームが確認の上、適切に対応します。</p>
                <br />
                <p className="font-black">■ その他</p>
                <p className="mt-2 px-4">このサイトは、ユーザーが不安を軽減し、病気への取り組みを支えることを目的としています。個人の日記の共有を通じて、互いに励まし合える場を目指しています。皆さまのご協力によって、このコミュニティが安心で温かいものになりますよう、心よりお願い申し上げます。</p>
            </div>
        </div>
    )
}

export default GuidelinesSetting;