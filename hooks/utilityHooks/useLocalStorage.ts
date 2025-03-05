


const useLocalStorage = (key: string) => {

    const setItem = (item: unknown) =>{
        try{

            window.localStorage.setItem(key, JSON.stringify(item))
        }catch(error){
            console.log(error)
        }
    }

    const getItem = () =>{
        try{
           const item = window.localStorage.getItem(key)
           if(item){
                return JSON.parse(item)
           }
        }catch(error){
            console.log(error)
        }
    }

    const removeItem = () =>{
        try{
            const item = window.localStorage.getItem(key)
            if(item){
                window.localStorage.removeItem(key)
            }
            else{
                console.log("item not in local storage")
                throw new Error("item not in local storage")
            }
        }catch(error){
            console.log(error)
        }
    }

    return {setItem, getItem, removeItem};
}
 
export default useLocalStorage;