import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Login =()=>{
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect(()=> {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    }, [])

    const handleLogin= async()=>{
        let result = await fetch('api/login', {
            method: 'post',
            body: JSON.stringify({ email, password}),
            headers: {
                'Content-Type': 'application/json'
            }  
        });
        result = await result.json();
        console.log("Login Result:",result);
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));

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
        </div>
    )

}

export default Login;