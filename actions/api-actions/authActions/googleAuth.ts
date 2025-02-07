
const googleAuth = async () => {
    try {
        // Instead of making a direct API call, redirect to the backend auth URL

        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`;
    } catch (error) {
        console.error("Google auth error:", error);
        throw error;
    }
}

export default googleAuth;