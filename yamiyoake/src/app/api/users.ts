import axios from "axios";
export async function GetUserData(){
    try{
        const token = sessionStorage.getItem("acess_token");
        if(!token) return;
        const res = await axios.get(`http://44.199.138.134:8080/users`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
        })
        return res.data;
    }catch(e){
        console.log(e + "エラーです。");
    }
}
interface UserID{
    user_id:string;
}
export async function GetUserID() {
    const data = await GetUserData() as UserID;
    if(!data)return;
    return data.user_id;
}
