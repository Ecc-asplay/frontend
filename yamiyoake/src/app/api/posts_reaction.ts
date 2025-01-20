import axios from "axios";
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
        const res = await axios.get("http://44.199.138.134:8080/post/reaction/all")
        return res.data;
    } catch (e) {
        console.log(e + "エラー");
    }
}
export async function GetPostCommentsList(post_id: string) {
    try {
        const token = await GetToken();
        post_id = "f3fe26d3-5a0e-41ab-be19-22a5a68e5da9";
        const res = await axios.get(`http://44.199.138.134:8080/comment/getlist/${post_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        return res;
    } catch (e) {
        console.log(e + "エラー");
    }
}

export async function GetAllPublicComments() {
    try {
        const res = await axios.get("http://44.199.138.134:8080/comment/getpublic");
        return res.data;
    } catch (e) {
        console.log(e + "エラー");
    }

}