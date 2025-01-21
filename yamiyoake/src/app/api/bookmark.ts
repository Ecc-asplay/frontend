import axios from "axios";
import { GetToken } from "./token";
import {URL} from "./server";
export async function CreateBookmark(PostID:string) {
    try{
        const token = await GetToken();
        const res = await axios.post(URL+"/bookmark/add",{post_id:PostID},{
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
        const res = await axios.get(URL+"/bookmark/get",{
            headers:{
                Authorization:`Bearer ${token}`
            },
        });
        return res;
    }catch(e){
        console.log(e+"エラー");
    }
    

}
