import { createContext, use, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

export const AppContextProvider = (props)=>{

    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false);


    const getDoctors = async()=>{
        try {
            const response = await axios.get(`${backendUrl}/api/doctor/list`);
            if(response.data.success){
                setDoctors(response.data.doctors);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error fetching doctors');
        }
    }

    const loadUserProfileData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-profile', {
                headers: {
                    token: token
                }
            });
            if(data.success){
                setUserData(data.userData);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    const value ={
        doctors, getDoctors,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData
    }

    useEffect(()=>
    {
        getDoctors();
    }, [])

useEffect(()=>{
    if(token){
        loadUserProfileData();
    }else{
        setUserData(false);
    }
}, [token])


    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider