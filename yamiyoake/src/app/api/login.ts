import axios from "axios";
interface Data{
    data:{
        access_token:any,
    },
    status:number
}
export async function login(email:string,password:string){
    try{
        const res = await axios.post("http://44.199.138.134:8080/login",{email,password}) as unknown as Data;
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