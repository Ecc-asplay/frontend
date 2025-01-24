import axios from "axios";
import { GetToken } from "./token";
import { URL } from "./server";
export interface UserData {
    user_id: string,
    username: string,
    email: string,
    birth: string,
    gender: string,
    is_privacy: boolean,
    disease: string,
    condition: string,
    hashpassword: string,
    certification: string,
    reset_password_at: string,
    created_at: string,
    update_at: string
}
interface UserID{
    user_id:string;
}
export interface UpdateData{
    email:string,
    password:string,
    gender:string,
    is_privacy:boolean
    name:{
        fname:string,
        lname:string,
    },
    disease_condition:{
        disease:string,
        condition:string,
    }
}
export async function GetUserData(){
    try{
        const token = await GetToken();
        if(!token) return;
        const res = await axios.get(URL+`/users/get`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
        });
        if(!res.data)return;
        return res.data as UserData;
    }catch(e){
        console.log(e + "エラーです。");
    }
}

export async function GetUserID() {
    const data = await GetUserData() as UserID;
    if(!data)return;
    return data.user_id;
}
interface Request{
    target:keyof UpdateData,
    url:string,
    params:string[]
}
export async function UpdateUserData(data:UpdateData) {
    try {
        const token = await GetToken();
        const update_url_list:Request[] = [
            {
                target:"password",
                url:"/users/password",
                params:["new_password"]
            },
            {
                target:"disease_condition",
                url:"/users/disease-condition",
                params:["disease","condition"]
            },
            {
                target:"email",
                url:"/users/email",
                params:["new_email"]
            },
            {
                target:"is_privacy",
                url:"/users/privacy",
                params:["is_privacy"]
            },
            {
                target:"name",
                url:"/users/name",
                params:["new_username"]
            }
        ]; 
        update_url_list.forEach(async(request:Request)=>{
            let req_data:any = {}; 
            request.params.forEach(param=>req_data={[param]:data[request.target]});
            console.log(req_data);
            const res = await axios.request(
                {
                    method:"PUT",
                    url:URL+request.url,
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    data:req_data
                }
            );
            console.log(res);
        })
    } catch (e) {
        
    }
}