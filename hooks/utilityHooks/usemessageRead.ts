

export const GetAndSetMessageRead = <T>(key: string) =>{
    const setItem = (item: T) =>{
        try{
            sessionStorage.setItem(key, JSON.stringify(item))
        }catch(error){
            console.log(error)
        }
    }

    const getItem = () : T | null =>{
        try{
            const item = sessionStorage.getItem(key)
            if(item){
                return JSON.parse(item) as T
            }
        }catch(error){
            console.log(error)
        }
        return null;
    }
    const removeSession = () =>{
        try{
            const item = sessionStorage.getItem(key)
            if(item){
                sessionStorage.removeItem(key)
            }
            else{
                console.log("item not in session storage")
                throw new Error("item not in session storage")
            }
        }catch(error){
            console.log(error)
        }
    }
    return {setItem, getItem, removeSession}; 
}