import axios from "axios";
export const ReactionTypes:(keyof Reaction)[]=[
    "c_reaction_thanks",
    "c_reaction_helpful",
    "c_reaction_useful",
    "c_reaction_heart"
];
import { GetToken } from "./token";
import { URL } from "./server";
export interface Reaction {
    user_id:string,
    comment_id:string,
    c_reaction_thanks:boolean,
    c_reaction_helpful:boolean,
    c_reaction_useful:boolean,
    c_reaction_heart:boolean,
}
export async function GetAllCommentsReaction(){
    try {
        const res = await axios.get(URL+"/comment/reaction/allData")
        return res.data;
    } catch (e) {
        console.log(e + "エラー");
    }
    
}

export async function UpdateCommentReactionThanks(comment_id:string,user_id:string){
    try {
        const token = await GetToken();
        const res = await axios.request({
            method:"PUT",
            url:URL+`/comment/reaction/Thanks`,
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data:{
                comment_id:comment_id,               
            }
        })
        return res;
    } catch (e) {
        console.log(e);
    }
}
export async function UpdateCommentReactionHeart(comment_id:string,user_id:string){
    try {
        const token = await GetToken();
        const res = await axios.request({
            method:"PUT",
            url:URL+`/comment/reaction/Heart`,
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data:{
                comment_id:comment_id,               
            }
        })
        return res;
    } catch (e) {
        console.log(e);
    }
}
export async function UpdateCommentReactionUseful(comment_id:string,user_id:string){
    try {
        const token = await GetToken();
        const res = await axios.request({
            method:"PUT",
            url:URL+`/comment/reaction/Useful`,
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data:{
                comment_id:comment_id,               
            }
        })
        return res;
    } catch (e) {
        console.log(e);
    }
}
export async function UpdateCommentReactionHelpful(comment_id:string,user_id:string){
    try {
        const token = await GetToken();
        const res = await axios.request({
            method:"PUT",
            url:URL+`/comment/reaction/Helpful`,
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data:{
                comment_id:comment_id,               
            }
        })
        return res;
    } catch (e) {
        console.log(e);
    }
}