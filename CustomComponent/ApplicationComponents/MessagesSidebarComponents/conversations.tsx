"use client"
import SearchBar from "@/CustomComponent/utilityComponent/searchBar";

const Conversations = () => {
    return (
        <div className="">
            <SearchBar value={""} onChange={function (value: string): void {
                throw new Error("Function not implemented.");
            } }/>

            <div className="">
                
            </div>
        </div>
    );
}
 
export default Conversations;