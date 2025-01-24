import axios from "axios";
import { URL } from "./server";
let Email_G:string="";
export async function SendVerificationEmail(email:string){
    try{
        Email_G=email;
        const res = await axios.post(URL+"/mail/send",{email});
        return res;
    }catch(e){
        console.log(e);
    }
}

export async function VerifyCode(Code:string) {
    try{
        const res = await axios.post(URL+"/mail/check",{Code,Email_G});
        console.log(res);
        return res;
    }catch(e){
        console.log(e);
    }
}