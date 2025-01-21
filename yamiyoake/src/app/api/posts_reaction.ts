import axios from "axios";
import { URL } from "./server";

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
