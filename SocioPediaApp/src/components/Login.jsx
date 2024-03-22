import React, { useEffect,useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import "./Entry.css";
import { useDispatch, useSelector } from 'react-redux';
import { login } from './state/reducer'; // import the login action

const Login =()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch(); // initialize useDispatch

    const user = useSelector(state => state.auth.user);

    useEffect(() => {
      if (user) {
        navigate("/");
      }
    }, [user]);

    const handleLogin= async()=>{
        let result = await fetch('http://localhost:4000/auth/login', {
            method: 'post',
            body: JSON.stringify({ email, password}),
            headers: {
                'Content-Type': 'application/json'
            }  
        });
        result = await result.json();
        console.log("Login Result:",result);
        if(result.token){
            // localStorage.setItem("user", JSON.stringify(result.user));
            // localStorage.setItem("token", JSON.stringify(result.token));

            dispatch(login({ user: result.user, token: result.token })); // dispatch the login action


            navigate("/");
        }

    }
    return(
        <div className="register-login">
        <h1>Sociopedia</h1>
        <div className="signup-login">
            <input type="text" className="inputBox" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} value ={email} />
            <input type="password" className="inputBox" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} value ={password} />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>

        </div>
        <p style={{color:"black"}}>Not signed up yet? Click here to <Link to="/signup"><span style={{color:"blue"}}>signup</span></Link> </p>

        </div>
    )

}

export default Login;