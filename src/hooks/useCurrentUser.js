import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import {authenticate} from ''


export const useCurrentUser = () =>{
    const [user,setUser] = useState(null)


    useEffect(()=>{
        const useCurrentUser = Cookies.get('currentUser');
        if (currentUser){
            setUser(JSON.parse(currentUser));
        }
    },[]);

    const refetchUser = async(userPhone) =>{
        const userInfo = await authenticate
    }
}