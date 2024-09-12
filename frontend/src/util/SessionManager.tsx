export const Logout = () => {
    if (localStorage.getItem("sessionInfo"))
        localStorage.removeItem("sessionInfo");
}

export const GetSession = (): any | null => {

    const sessionInfo = localStorage.getItem("sessionInfo");
    const sessionObj = sessionInfo ? JSON.parse(sessionInfo) : null;
    if (!sessionObj) {
        return null;
    }
    return sessionObj;
} 