import axios from "axios";
import { GetToken } from "./token";
import { URL } from "./server";
export interface Comment {
    comment_id:string,
    comments:string,
    created_at:string,
    is_censored:boolean,
    is_public:boolean,
    post_id:string,
    post_user:string,
    status:string,
    updated_at:string,
    user_id:string
}
export async function CreateComment(post_id: string, comments: string) {
    try {
        const token = await GetToken();
        const res = await axios.post(URL+"/comment/create", {
            post_id,
            comments
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res;
    } catch (e) {
        console.log(e + "エラー");
    }
}
export async function GetPostCommentsList(post_id: string) {
    try {
        const token = await GetToken();
        const res = await axios.get(URL+`/comment/getlist/${post_id}`, {
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
        const res = await axios.get(URL+"/comment/getpublic");
        return res.data;
    } catch (e) {
        console.log(e + "エラー");
    }

}

