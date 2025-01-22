"use client";
import { useEffect, useState } from "react";

type BlocklistData = {
    id: string;
    blockedAt: string;
}

const Blocklist: React.FC = () => {
    const [ blocklist, setList ] = useState<BlocklistData[]>([
        // テスト用追加
        { id: "123123", blockedAt: "2024-06-14 12:00" },
        { id: "456l456", blockedAt: "2024-06-15 15:30" },

    ])
    const [ loading, setLoading ] = useState(true)
    const [ confirmUnblockId, setConfirmUnblockId ] = useState<string|null>(null)
    

    useEffect(() => {
        const fetchList = async () => {
            try {
                // const response = await axios.get<BlocklistData[]>("api?/blocklist")
                // // データ取得
                // setList(response.data)
                console.log("Fetching...");

            } catch (error){
                console.error("Error: ", error);
            } finally {
                setLoading(false)
            }
        }
        fetchList()
    }, []);

    // ブロック解除
    const handleUnblock = async (id: string) => {
        try {
            // await axios.delete("api/blocklist",{data:{id}} as any)
            setList((prev) => prev.filter((index) => index.id != id))
        } catch (error) {
            console.error("Error: ", error);
        } finally {
            setConfirmUnblockId(null)
        }
    }

    return (
        <div className="flex flex-col px-6 py-12">
            <h1 className="text-middlebrown font-bold ml-2">ブロックリスト</h1>
            {/* リスト */}
            <table className="table-auto w-full ml-4 border-0">
                {/* <thead>
                    <tr className="text-middlebrown uppercase font-semibold">
                        <th className="py-3 px-6 text-center">ユーザーID</th>
                        <th className="py-3 px-6 text-center">ブロック時間</th>
                        <th></th>
                    </tr>
                </thead> */}
                <tbody className="text-basetext">
                    {blocklist.map((index) => (
                        <tr key={index.id} className="border-middlebrown">
                            <td className="text-left py-2 px-6">ユーザ：{index.id}</td>
                            {/* <td className="text-center py-3 px-6">{index.blockedAt}</td> */}
                            <td className="text-center py-2 px-6">
                                {/* 解除確認 */}
                                {confirmUnblockId === index.id ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <button className="bg-red-600 text-white px-4 py-1 rounded"
                                                    onClick={() => handleUnblock(index.id)}>
                                            解除する
                                        </button>
                                        <button className="bg-inputbg text-middlebrown px-4 py-1 rounded"
                                                    onClick={() => setConfirmUnblockId(null)}>
                                            キャンセル
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => setConfirmUnblockId(index.id)}
                                        className="bg-red-600 text-white px-4 py-1 rounded">
                                        解除
                                    </button>
                                )
                                }
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            {/* ブロックリストがない場合 */}
            {blocklist.length === 0 && (
                <p className="text-center py-6 text-middlebrown">ブロックされたユーザーはいません。</p>
            )}
        </div>
    )
}

export default Blocklist;