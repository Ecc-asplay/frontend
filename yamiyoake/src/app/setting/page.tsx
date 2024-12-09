"use client"
import { useState } from "react";
import SideBar from "./SideBar";
import SideBarSelected from "./SideBarSelected";

const Setting: React.FC = () => {
    const [activeKey, setActiveKey] = useState("about");

    return(
        <div className="flex flex-col">
            {/* ヘッダ */}
            <div className="fixed top-0 w-full h-8 bg-headerbrown"></div>

            {/* サイドバー */}
            <div className="flex mt-4 p-0 m-0">
                <SideBar onselect={setActiveKey}/>
                <div className="p-5">
                    {SideBarSelected[activeKey]}
                </div>
            </div>
        </div>
    )
}

export default Setting;