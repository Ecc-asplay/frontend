import axios from "axios";
import { GetToken } from "./token";
import { URL } from "./server";

export async function GetNotificationsByUser(){
    try{
        const token = await GetToken();
        const res = await axios.get(URL+"/notification/get",{
            headers:{
                Authorization:`Bearer ${token}`
            },
        });
        return res;
    }catch(e){
        console.log(e);
        return null;
    }
    
}
