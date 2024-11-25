export async function login(formData:FormData){
    const res = await fetch("http://localhost:8080/login",{
        method:"POST",
        body:JSON.stringify({
            email:formData.get('email'),
            password:formData.get('password')
        })
    });
    const data = res.json();
    return data
}