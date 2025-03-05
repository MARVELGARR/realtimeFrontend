const useSessionStorage = (key: string) => {

    const setItem = (item: unknown) =>{
        try{
            window.sessionStorage.setItem(key, JSON.stringify(item))
        }catch(error){
            console.log(error)
        }
    }

    const getItem = () =>{
        try{
            const item = window.sessionStorage.getItem(key)
            if(item){
                return JSON.parse(item)
            }
        }catch(error){
            console.log(error)
        }
    }

    const removeSession = () =>{
        try{
            const item = window.sessionStorage.getItem(key)
            if(item){
                window.sessionStorage.removeItem(key)
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
 
export default useSessionStorage;