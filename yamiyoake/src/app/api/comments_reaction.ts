import axios from "axios";
export const ReactionTypes:(keyof Reaction)[]=["Thanks","heart","helpful","useful"];
export interface Reaction {
    comment_id:string,
    Thanks:number,
    heart:number,
    helpful:number,
    useful:number
}
export async function GetAllCommentsReaction(){
    try {
        const res = await axios.get("http://44.199.138.134:8080/comment/reaction/allpublic")
        return res.data;
    } catch (e) {
        console.log(e + "エラー");
    }
    
}