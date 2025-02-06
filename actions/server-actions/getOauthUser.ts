
const getOauthUser = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching OAuth user:", error);
        throw error;
    }
    
}
 
export default getOauthUser;