import axios from "axios";
import { URL } from "./server";

interface Data{
    data:{
        access_token:any,
    },
    status:number
}
export async function login(email:string,password:string){
    try{
        const res = await axios.post(URL+"/login",{email,password}) as unknown as Data;
        console.log(res);
        if(!res.data)return;
        if(res.status === 200){
            if(res.data?.access_token){
                sessionStorage.setItem("acess_token",res.data.access_token);
            }
            return true;
        }
        else{
            console.log("status" + res.status);
            return false;
        }
    
    }
    catch(e){
        return false;
    }   
}