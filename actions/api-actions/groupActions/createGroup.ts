


const createGroup = async() => {

    try{
        const res =  await fetch(``,{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({}),
            credentials: "include"
        })
        if(res.ok){
            const data =  res.json()
            return data
        }
        else{
            const errorDetails =  res.json()
            console.error(errorDetails)
            throw new Error(`${errorDetails}`)
        }
    }
    catch(error){
        console.error(error)
            throw new Error(`${error}`)
    }
}
 
export default createGroup;