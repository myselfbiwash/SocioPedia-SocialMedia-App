import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css';

const SignUp=()=>{
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [location,setLocation]=useState("");
    const [occupation,setOccupation]=useState("");
    const [picture,setPicture]=useState("");



    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
    })

    const collectData= async (event)=>{

        event.preventDefault();

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('location', location);
        formData.append('occupation', occupation);
        formData.append('picture', picture);

        // console.log("type of form data", typeof(formData));
        // console.log("form data", formData);

   try{
    let result = await fetch('http://localhost:4000/auth/register', {
        method: 'post',
        body: formData,
       
    });

    result = await result.json();
    console.log("SignUp Result:", result);
    localStorage.setItem("user", JSON.stringify(result.savedUser));
    // localStorage.setItem("token", JSON.stringify(result.auth));

    if(result)
    {
        navigate('/');
    }
   }
    catch(err){
         console.log(err)
    }
}


const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
}
    return(
        <div className="register">
            <h1>Register</h1>
            <form className='product' onSubmit={collectData} encType='multipart/form-data'>

           <div> <input className ="inputBox" type = "text" 
            value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder ="First Name" />

            <input className ="inputBox" type = "text" 
            value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder ="Last Name" />
            </div>

            <input className ="inputBox" type = "text" 
            value={location} onChange={(e)=>setLocation(e.target.value)} placeholder ="Location" />

<input className ="inputBox" type = "text" 
            value={occupation} onChange={(e)=>setOccupation(e.target.value)} placeholder ="Occupation" />

<input className ="inputBox" type = "file"  onChange={handleFileChange}  />

            <input className ="inputBox" type = "text" 
            value={email} onChange={(e)=>setEmail(e.target.value)} placeholder ="Enter Email" />
            
            <input className ="inputBox" type = "password" 
            value={password} onChange={(e)=>setPassword(e.target.value)} placeholder ="Enter Password" />
            
            <button  className ="appButton" type="submit" >Sign Up</button>
            </form>


        </div>
    )
}

export default SignUp;