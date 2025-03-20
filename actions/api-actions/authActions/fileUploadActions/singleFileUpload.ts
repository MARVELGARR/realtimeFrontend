type singlefileUploadProp ={
    message: string,
    url: string
}


const singlefileUpload = async( data: FormData): Promise<singlefileUploadProp> => {
    try{
        const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/singleFileUpload`,{
            method: "POST",
            
            body: data,
            credentials: "include"
        })
        if(res.ok){
            const data =  await res.json()
            return data
        }
        else{
            const errorDetails =  await res.json()
            console.error(errorDetails)
            throw new Error(`${errorDetails}`)
        }
    }
    catch(error){
        console.error(error)
            throw new Error(`${error}`)
    }
}
 
export default singlefileUpload;