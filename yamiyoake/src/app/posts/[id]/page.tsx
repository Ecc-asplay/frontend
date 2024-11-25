'use client'
import { useState,useEffect } from "react";
import { testData } from "@/app/test_data";
import { Comments } from "@/app/components/comments";
import { LeftNavigation } from "@/app/components/navigations/left";
import { color_reactions } from "@/app/reactions"; 
import bookmark from "@/app/img/bookmark-svgrepo-com.png";
import Image from "next/image";
interface PostID{
    params:{id:string | null}
}

export default function Posts({params}:PostID){
    const [id, setId] = useState<string | null>(null);
    const [post, setPost] = useState<typeof testData[0] | undefined>(undefined);

    useEffect(() => {
        async function unwrapParams() {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        }
        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (id) {
            const foundPost = testData.find(e => e.post_id === id);
            setPost(foundPost);
        }
    }, [id]);
    

    if (!post) {
        return <div>Post not found</div>;
    }
    return(
        <div className="flex w-full h-screen">
            <LeftNavigation/>
            <div className="flex flex-col w-[60%] bg-[#E8E7E6]">
                <div className="header bg-[#B8A193] object-cover w-full h-[10%]"/>
                <div className="flex flex-col  m-10">
                    <div className="flex justify-between items-center">
                        <Image src={color_reactions[post.reaction]} width={50} height={50} alt="reaction" />
                        <p className="text-2xl font-extrabold">{post.title}</p>
                        <Image src={bookmark} width={50} height={50} alt="bookmark"/>
                    </div>
                    <div className="flex items-center justify-end p-10 text-[#BEA99D]">
                        <p>{post.created_at}</p>
                        <p className="mx-5">{post.post_id}</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-[#807166]">
                            {post.content}
                        </div>
                    </div>
                </div>
                
            </div>
            <Comments post_id={post?.post_id as string}/>
        </div>
    );
}