import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import { useAuth } from "./context";

export default function PrivateRoute(){
    const [ok,setOk]=useState(false)
    const[auth,setAuth]=useAuth()

    useEffect(() => {
        const authCheck = async () => {
          const res = await axios.get(`http://localhost:5000/api/auth/user-auth`);
          if (res&&res.data.ok) {
            console.log(res.data.ok)
            setOk(true);
          } else {
            setOk(false);
          }
        };
        if (auth?.token) authCheck();
      }, [auth?.token]);
    
      return ok ? <Outlet /> : <Spinner />;
}