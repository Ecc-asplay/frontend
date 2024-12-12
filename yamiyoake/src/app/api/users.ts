import axios from "axios";
export async function GetUserData(){
    try{
        const token = sessionStorage.getItem("access_token");
        const UserID = "2b22e3cc-6ff8-44a1-8ccf-e22386db68cc"
        const res = await axios.get(`http://44.199.138.134:8080/users/`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            params:{
                UserID:UserID
            }
        })
        console.log(res)
    }catch(e){
        console.log(e + "エラーです。");
    }
}
