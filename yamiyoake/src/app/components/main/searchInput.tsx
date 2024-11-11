//ポスト一覧の検索バー
import Image from "next/image";
import search from "@/app/img/search-svgrepo-com.png"; 
import filter from "@/app/img/filter-svgrepo-com.png"; 
const SearchInput = () =>{
    return(
        <div className="flex object-cover w-[80%] items-center m-10 bg-[#DDD4CF] rounded-2xl p-1">
            <Image src={search} width={30} height={30} alt={"search"} className="mx-3"/>
            <input type="text" placeholder="検索" className="object-cover w-full rounded-xl bg-transparent  outline-none px-3 "/>
            <Image src={filter} width={30} height={30} alt={"search"} className="mx-3"/>
        </div>
        
    );
}
export {SearchInput}