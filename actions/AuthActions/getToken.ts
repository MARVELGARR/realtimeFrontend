import { cookies } from 'next/headers'

export default async function getToken() {
    const cookieStore = cookies()
    const sessionID = (await cookieStore).get('sessionID')?.value
    
    if (!sessionID) {
        throw new Error("No token found")
    }
    
    return sessionID
}