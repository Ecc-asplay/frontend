import axios from "axios";

export async function GetToken() {
    try{
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://44.199.138.134:8080/protected", {
            headers: { Authorization: token },
        });
        console.log(response);
        return response;
    }
    catch(e){
        return "server error";
    }
    
}