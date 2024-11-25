export async function GET() {
    const res = await fetch("http://localhost:8080/getposts");
    const data = await res.json();
    console.log(data);
}