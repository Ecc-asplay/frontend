import axios from "axios";
export async function login(email:string,password:string){
    try{
        const res = await axios.post("http://44.199.138.134:8080/login",{email,password});
        console.log(res);
        if(res.status === 200){
            if(res.data.token != null){
                sessionStorage.setItem("acess_token",res.data.token);
                console.log(res.data.login_at)
            }
            return true;
        }
        else{
            console.log("status" + res.data.status);
            return false;
        }
    
    }
    catch(e){
        return false;
    }
    
    
}