import axios from "axios";
import { useState,useEffect,useContext,createContext } from "react";

const AuthContext = createContext()


const AuthProvider = ({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:""
    })
    //default axios
    useEffect(()=>{
        const data = localStorage.getItem('auth')
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token,
            })
        }
        //eslint-disable-next-line
    },[])
    axios.defaults.headers.common['Authorization']=auth?.token
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//custom hook
const useAuth =  () => useContext(AuthContext)

export {useAuth,AuthProvider}