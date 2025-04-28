import { cn } from "@/lib/utils";

const AppSideBar = ({className}:{
    className?:string
}) => {
    return (
        <div className={cn(className, "fixed left-2 top-0 h-full w-[4rem]   rounded-lg shadow-xl shadow-cyan-300 ")}>
          
        </div>
    );
}
 
export default AppSideBar;