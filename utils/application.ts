

export const handleIsFriendOnline = (friends: string[], userId: string)=>{
    return friends.includes(userId)
}