import { useEffect, useState } from "react";


const useDebounce = <T,>(value: T, delay = 500) => {
    const [debounceValue, seDebounceValue] = useState(value)

    useEffect(()=>{

        const handler = setTimeout(()=>{
            seDebounceValue(value)
        }, delay)

        return () =>{
            clearTimeout(handler)
        }
    }, [value, delay])

    return debounceValue;
}
 
export default useDebounce;