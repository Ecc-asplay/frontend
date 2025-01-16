export async function GetToken() {
    try{
        const token = sessionStorage.getItem("acess_token");
        console.log(token !== null)
        return token;
    }
    catch(e){
        return "server error";
    }
    
}