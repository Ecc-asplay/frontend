import axios from "axios";
import { URL } from "./server";
import { GetToken } from "./token";

export const ReactionTypes:(keyof Reaction)[]=["Thanks","heart","helpful","useful"];
export interface Reaction {
    post_id:string,
    Thanks:number,
    heart:number,
    helpful:number,
    useful:number
}
export async function GetAllPostsReaction() {
    try {
        const res = await axios.get(URL+"/post/reaction/all")
        return res.data;
    } catch (e) {
        console.log(e + "エラー");
    }
}

export async function UpdatePostReactionThanks(post_id:string){
    try {
        const token = await GetToken();
        const res = await axios.request({
            method:"PUT",
            url:URL+`/post/reaction/Thanks`,
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data:{
                post_id:post_id
            }
        })
        console.log(res);
        return res;
    } catch (e) {
        console.log(e);
    }
}
export async function UpdatePostReactionHeart(post_id:string){
    try {
        const token = await GetToken();
        const res = await axios.request({
            method:"PUT",
            url:URL+`/post/reaction/Heart`,
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data:{
                post_id:post_id
            }
        })
        return res;
    } catch (e) {
        console.log(e);
    }
}
export async function UpdatePostReactionUseful(post_id:string){
    try {
        const token = await GetToken();
        const res = await axios.request({
            method:"PUT",
            url:URL+`/post/reaction/Useful`,
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data:{
                post_id:post_id
            }
        })
        return res;
    } catch (e) {
        console.log(e);
    }
}
export async function UpdatePostReactionHelpful(post_id:string){
    try {
        const token = await GetToken();
        const res = await axios.request({
            method:"PUT",
            url:URL+`/post/reaction/Helpful`,
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data:{
                post_id:post_id
            }
        })
        return res;
    } catch (e) {
        console.log(e);
    }
}
