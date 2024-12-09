import axios from "axios";
export async function GetAllPosts() {
    try{
        const res = await axios.get("http://44.199.138.134:8080/post/getall");
        return res;
    }catch(e){
        return false;
    }
}