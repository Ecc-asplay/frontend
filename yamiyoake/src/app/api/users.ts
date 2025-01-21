import axios from "axios";
import { GetToken } from "./token";
import { URL } from "./server";

export async function GetUserData(){
    try{
        const token = await GetToken();
        if(!token) return;
        const res = await axios.get(URL+`/users/get`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
        })
        return res.data;
    }catch(e){
        console.log(e + "エラーです。");
    }
}
interface UserID{
    user_id:string;
}
export async function GetUserID() {
    const data = await GetUserData() as UserID;
    if(!data)return;
    return data.user_id;
}
