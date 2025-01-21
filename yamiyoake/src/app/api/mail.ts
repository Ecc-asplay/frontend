import axios from "axios";
import { URL } from "./server";
let Email:string="";
export async function SendVerificationEmail(email:string){
    try{
        Email=email;
        const res = await axios.post(URL+"/mail/send",{Email});
        return res;
    }catch(e){
        console.log(e);
    }
}

export async function VerifyCode(Code:string) {
    try{
        const res = await axios.post(URL+"/mail/check",{Code,Email});
        console.log(res);
        return res;
    }catch(e){
        console.log(e);
    }
}