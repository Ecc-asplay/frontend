export async function GetToken() {
    try{
        const token = sessionStorage.getItem("acess_token");
        return token;
    }
    catch(e){
        return "server error";
    }
    
}