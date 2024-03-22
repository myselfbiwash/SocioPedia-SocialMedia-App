import React  from "react";
import {Navigate, Outlet} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


const PrivateComponent=()=>{
    const auth = useSelector(state => state.auth.user);

    // const auth = localStorage.getItem('user');
    return auth?<Outlet />:<Navigate to="/login" />
}

export default PrivateComponent;