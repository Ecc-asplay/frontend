import axios from "axios";

export async function getToken() {
    try{
        /* 
        const response = await axios.get("http://44.199.138.134:8080/protected",{
            headers: { Authorization: token },    
        });
        console.log(response);
        */
        const token = sessionStorage.getItem("token");
        console.log(token !== null)
        return token !== null;
    }
    catch(e){
        return "server error";
    }
    
}