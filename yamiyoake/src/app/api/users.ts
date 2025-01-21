import axios from "axios";
import { GetToken } from "./token";
export async function GetUserData(){
    try{
        const token = await GetToken();
        if(!token) return;
        const res = await axios.get(`http://44.199.138.134:8080/users/get`,{
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
