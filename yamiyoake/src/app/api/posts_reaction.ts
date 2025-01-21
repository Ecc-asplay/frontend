import axios from "axios";
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
