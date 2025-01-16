import axios from "axios";
interface Data{
    data:{
        access_token:any,
    },
    status:number
}
export async function register(Username:string,Email:string,Birth:string,Gender:string,Password:string){
    try{
        Birth = "2000-09-09"
        const res = await axios.post("http://44.199.138.134:8080/users",{Username,Email,Birth,Gender,Password}) as unknown as Data;
        console.log(res);
        if(!res.data)return;
        if(res.status === 200){
            if(res.data?.access_token){
                sessionStorage.setItem("acess_token",res.data.access_token);
            }
            return true;
        }
        else{
            console.log("status" + res.status);
            return false;
        }
    
    }
    catch(e){
        return false;
    }
    
    
}