


export const isOnline = (): boolean=>{
    const presence = sessionStorage.getItem('status')
    if(presence === "online"){
        return true
    }
    else{
        return false
    }
}