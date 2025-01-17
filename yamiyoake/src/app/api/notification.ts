import axios from "axios";
import { GetToken } from "./token";
export async function GetNotificationsByUser(){
    const token = await GetToken();
    const res = await axios.get("http://44.199.138.134:8080/notification/get",{
        headers:{
            Authorization:`Bearer ${token}`
        },
    });
    return res;
}
