"use client"
import { useState } from "react";
import SideBar from "./SideBar";
import SideBarSelected from "./SideBarSelected";
import NotiDetailPush from "./noti-detail-push";
import NotiDetailEmail from "./noti-detail-email";

const Setting: React.FC = () => {
    const [activeKey, setActiveKey] = useState("");

    return(
        <div className="flex flex-col bg-basebg min-h-screen">
            {/* ヘッダ */}
            <div className="fixed top-0 w-full h-8 bg-headerbrown"></div>

            {/* サイドバー */}
            <div className="flex mt-4 p-0 m-0 h-full">
                <SideBar onselect={setActiveKey}/>
                <div className="min-w-[700px] p-5">
                    {/* {SideBarSelected[activeKey]} */}
                    {activeKey === "notiDetailPush" ? (
                        <NotiDetailPush onselect={setActiveKey} />
                    ): activeKey === "notiDetailEmail" ?(
                        <NotiDetailEmail onselect={setActiveKey} />
                    ): (SideBarSelected(setActiveKey)[activeKey]
                    )}
                </div>
            </div>
        </div>
    )
}

export default Setting;