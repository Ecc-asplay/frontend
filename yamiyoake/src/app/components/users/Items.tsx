import { User_Posts } from "./User_posts";
import { User_Comments } from "./User_comments";
import { User_Bookmarks } from "./User_bookmarks";
import { User_Drafts } from "./User_drafts";
interface Item_number{
    user_id:string | undefined
    index:number
}
const Items:React.FC<Item_number> = ({user_id,index}) =>{
    const item = () =>{
        switch(index){
            case 0:
                return(
                    <User_Posts user_id={user_id}/>
                );
            case 1:
                return(
                    <User_Comments user_id={user_id}/>
                );
            case 2:
                return(
                    <User_Bookmarks user_id={user_id}/>
                );        
            case 3:
                return(
                    <User_Drafts user_id={user_id}/>
                ); 
            case -1:
                return<></>    
            default:
                return(
                    <div>not found</div>
                );               
    }
    }
    return(
        <div className="object-cover w-full h-full">
            {item()}
        </div>
    );
}
export {Items}