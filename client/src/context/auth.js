import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const data = localStorage.getItem('auth');
    const parseData = JSON.parse(data || '{}');
    axios.defaults.headers.common["Authorization"] = parseData.token;
    const [auth, setAuth] = useState({
        user: parseData.user,
        token: parseData.token
    });

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//custom hook 
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }