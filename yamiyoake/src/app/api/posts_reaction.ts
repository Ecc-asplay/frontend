import axios from "axios";
import { URL } from "./server";
import { GetToken } from "./token";

export const ReactionTypes:(keyof Reaction)[]=[
                    "p_reaction_thanks",
                    "p_reaction_helpful",
                    "p_reaction_useful",
                    "p_reaction_heart"
                ];
export interface Reaction {
    user_id:string,
    post_id:string,
    p_reaction_thanks:boolean,
    p_reaction_helpful:boolean,
    p_reaction_useful:boolean,
    p_reaction_heart:boolean,
    
}
export async function GetAllPostsReaction() {
    try {
        const res = await axios.get(URL+`/post/reaction/allData?${new Date().getSeconds}`);
        console.log(res);
        return res.data as Reaction[];
    } catch (e) {
        console.log(e + "エラー");
    }
}

export async function UpdatePostReactionThanks(post_id:string,user_id:string){
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
                post_id:post_id,
                user_id:user_id
            }
        })
        console.log(res);
        return res;
    } catch (e) {
        console.log(e);
    }
}
export async function UpdatePostReactionHeart(post_id:string,user_id:string){
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
                post_id:post_id,
                user_id:user_id
            }
        })
        return res;
    } catch (e) {
        console.log(e);
    }
}
export async function UpdatePostReactionUseful(post_id:string,user_id:string){
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
                post_id:post_id,
                user_id:user_id
            }
        })
        return res;
    } catch (e) {
        console.log(e);
    }
}
export async function UpdatePostReactionHelpful(post_id:string,user_id:string){
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
                post_id:post_id,
                user_id:user_id
            }
        })
        return res;
    } catch (e) {
        console.log(e);
    }
}
