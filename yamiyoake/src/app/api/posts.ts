import axios from "axios";
import { URL } from "./server";

// 型定義 
export interface Post {
  post_id: string;
  user_id: string;
  show_id: string;
  title: string;
  content: string | any[];
  reaction: number;
  feel: string;
  is_sensitive: boolean;
  status: string;
  created_at: string;
  update_at: string;
}
export interface Posts {
  posts: Post[];
}
export async function GetAllPosts() {
    try{
        const res = await axios.get(URL+"/post/getall");
        return res.data;
    }catch(e){
        return false;
    }
}

export async function SearchPosts(Keyword:string) {
    try{
        const res = await axios.post(URL+"/post/search");
        console.log(res);
        return res.data;
    }catch(e){
        return false;
    }
}

export async function CreatePost(Title:string,Feel:string,Content:any,Reaction:number,Status:string,ShowID:string=""){
    try{
        const token = sessionStorage.getItem("acess_token");
        if(!Title || !Content){
            alert("入力内容を確認して下さい");
            return false;
        }
        Content = JSON.stringify(Content)
        Content = btoa(
            String.fromCharCode(...new TextEncoder().encode(Content))
        );
        const res = await axios.post(URL+"/post/add",{ShowID,Title,Feel,Content,Reaction,Status},
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        alert("投稿完了");
        return res;
    }catch(e){
        alert("投稿不可");
    }
    
}