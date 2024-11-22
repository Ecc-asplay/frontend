import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import happa from "@/app/img/happa.png";
import pencil from "@/app/img/pencil.png";
const RightNavigation = () =>{
    return(
        <div className="bg-[url('img/mokume.png')] bg-repeat-round w-[20%] h-screen relative">
            <div className="absolute top-0 left-7">
                <Image src={happa} alt="happa" width={50} className="h-full" />
            </div>
            <div className="absolute bottom-0 right-7 transition hover:-translate-y-4 hover:duration-200">
                <Link href={"/post"}><Image src={pencil} alt="happa" width={50} className="h-full" /></Link>
            </div>
        </div>
    );
}
export {RightNavigation}