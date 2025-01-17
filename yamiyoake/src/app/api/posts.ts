import axios from "axios";
export async function GetAllPosts() {
    try{
        const res = await axios.get("http://44.199.138.134:8080/post/getall");
        return res.data;
    }catch(e){
        return false;
    }
}

export async function SearchPosts(Keyword:string) {
    try{
        const res = await axios.post("http://44.199.138.134:8080/post/search");
        console.log(res);
        return res;
    }catch(e){
        return false;
    }
}

export async function CreatePost(Title:string,Feel:string,Content:any,Reaction:number,Status:string,ShowID:string=""){
    const token = sessionStorage.getItem("acess_token");
    Content = JSON.stringify(Content)
    Content = btoa(
        String.fromCharCode(...new TextEncoder().encode(Content))
    );
    const res = await axios.post("http://44.199.138.134:8080/post/add",{ShowID,Title,Feel,Content,Reaction,Status},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    return res;
}