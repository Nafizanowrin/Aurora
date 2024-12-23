import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider =  ({ children }) => {


    const[token,setToken] = useState(localStorage.getItem("token"));

    const[user,setUser] = useState("");

    const storeTokenInLs =  (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    }
    
    let isLoggedin = !!token;
    console.log("Logged in",isLoggedin);

    const LogoutUser = () => {

        setToken("")
        return localStorage.removeItem("token");
    }


    const userAuthentication = async() => {

        try{
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            if(response.ok){
                const data = await response.json();
                setUser(data.userData);
            }
        }
        catch(error){
            console.log("Error",error)
        }

    }

    useEffect(() => {
        userAuthentication();
    },[token])


    return <AuthContext.Provider value={{storeTokenInLs, LogoutUser, isLoggedin, user}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue =  useContext(AuthContext);
    if (!authContextValue) {
        throw new  Error('useAuth must be used within the AuthProvider');
    }

    return authContextValue;
}