import axios from "axios";
import { GetToken } from "./token";
export async function CreateBookmark(PostID:string) {
    try{
        const token = await GetToken();
        const res = await axios.post("http://44.199.138.134:8080/bookmark/add",{post_id:PostID},{
            headers:{
                Authorization:`Bearer ${token}`
            },
        });
        console.log(res + "bookmark");
        return res !== null;
    }catch(e){
        console.log(e+"エラー");
    }
    

}
export async function GetBookmark() {
    try{
        const token = await GetToken();
        console.log(token + "token");
        const res = await axios.get("http://44.199.138.134:8080/bookmark/get",{
            headers:{
                Authorization:`Bearer ${token}`
            },
        });
        return res;
    }catch(e){
        console.log(e+"エラー");
    }
    

}
