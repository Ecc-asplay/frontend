import axios from "axios";
import { GetToken } from "./token";
export async function CreateBookmark(PostID:string) {
    try{
        const token = await GetToken();
        PostID = "46ce3ef5-d59d-416f-ba91-ddb8d2d7d7ad";
        const res = await axios.post("http://44.199.138.134:8080/bookmark/add",{PostID},{
            headers:{
                Authorization:`Bearer ${token}`
            },
        });
        console.log(res);
        return res !== null;
    }catch(e){
        console.log(e+"エラー");
    }
    

}
CreateBookmark("46ce3ef5-d59d-416f-ba91-ddb8d2d7d7ad")
export async function GetBookmark() {
    try{
        const token = await GetToken();
        console.log(token + "token");
        const res = await axios.get("http://44.199.138.134:8080/bookmark/get",{
            headers:{
                Authorization:`Bearer ${token}`
            },
        });
        console.log(res);
        return res !== null;
    }catch(e){
        console.log(e+"エラー");
    }
    

}
