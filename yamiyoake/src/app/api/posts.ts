import axios from "axios";
export async function GetAllPosts() {
    try{
        const res = await axios.get("http://44.199.138.134:8080/post/getall");
        return res;
    }catch(e){
        return false;
    }
}

export async function SearchPosts(Keyword:string) {
    try{
        const res = await axios.post("http://44.199.138.134:8080/post/search",Keyword);
        return res;
    }catch(e){
        return false;
    }
}