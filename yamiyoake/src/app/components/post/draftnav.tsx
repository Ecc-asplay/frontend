import Image from "next/image";
import happa from "@/app/img/happa.png"
import image from "@/app/img/image-svgrepo-com.png"
import file from "@/app/img/file-04-svgrepo-com.png"
import plus from "@/app/img/plus-large-svgrepo-com.png"
import { useEffect } from "react";
const DraftNavigation = () =>{
    //投稿ページの右側
    const dragStart = (e:any) => {
        e.dataTransfer.effectAllowed = "move";
        const {id} = e.target;
        localStorage.setItem("id",id);
        console.log("started");
        console.log(localStorage.getItem("id"));
    }

    return(
        <div className="bg-[url('img/mokume.png')] bg-repeat-round w-[20%] h-screen relative flex flex-col items-center">
            <div className="flex -ml-8 items-center">
                <Image src={happa} alt="happa" width={50} className="h-full" />
                <p className="text-center m-3 text-xl text-green-300">下書き</p>
            </div>
            <div id="image_add" className="w-[80%] h-[30%] bg-[#D9D9D9] my-3 rounded-lg flex items-center justify-center relative" draggable="true" onDragStart={e=>dragStart(e)} onDragEnd={()=>{alert("end")}} >
                <Image src={image} alt="image icon" className="w-[60%]" draggable="false"></Image>
                <Image src={plus} alt="plus icon" width={30} height={30} className="absolute top-3 left-3" draggable="false"></Image>
            </div>
            <div id="page_add" className="w-[80%] h-[30%] bg-[#D9D9D9] mt-3 rounded-lg flex items-center justify-center relative" draggable="true">
                <Image src={file} alt="file icon" className="w-[60%]" draggable="false"></Image>
                <Image src={plus} alt="plus icon" width={30} height={30} className="absolute top-3 left-3" draggable="false"></Image>
            </div>
            <button className="bg-[#B8A193] rounded-lg text-white w-[40%] p-3 text-2xl my-5">
                投稿
            </button>
        </div>
    );
}

export {DraftNavigation} 