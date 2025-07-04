

export const logout = () => {
    localStorage.removeItem("auth")
    console.log("Logout Success")
}

export const isLogin = () => {
    if(localStorage.getItem("auth")) return true;
    return false;
} 

export const user = () => {
    const auth =(localStorage.getItem("auth"));
    if (!auth) return null;
    return JSON.parse(auth);
}