import axios from "axios";
import { GetToken } from "./token";
const token = await GetToken();
export async function CreateComment(PostID:string,Comments:string,IsPublic:boolean,Reaction:number,IsCensored:boolean) {
    try{
        const res = await axios.post("http://44.199.138.134:8080/comment/create",{
            PostID,
            Comments,
            IsPublic,
            Reaction,
            IsCensored
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log(res);
    }catch(e){
        console.log(e + "エラー");
    }
}
await CreateComment("fc8e0839-a3f1-4985-8dd7-04de85a3289f","comment",true,1,true);
export async function GetAllComments() {
    try{
        const res = await axios.get("http://44.199.138.134:8080/comment/all",{
            headers:{
                Authorization:`Bearer ${token}`
            },
        })
        console.log(res);
    }catch(e){
        console.log(e + "エラー");
    }
}