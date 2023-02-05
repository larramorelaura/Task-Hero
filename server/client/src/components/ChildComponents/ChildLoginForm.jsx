import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const ChildLoginForm = () => {
    const[username, setUsername]=useState("");
    const[password, setPassword]=useState("")
    const[error, setError]=useState("")
    const navigate= useNavigate();


    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/child/login', {username, password}, {withCredentials:true})
        .then(res=>{
            // localStorage.setItem('user', JSON.stringify(res.data.user))
            console.log(res.data)
            const userId=res.data.data.userid
            console.log(userId)
            navigate(`/taskhero/child/dashboard/${userId}`)
        })
        
            
        
        
        .catch(err=>{
            setError("Invalid credentials");
        })
    }

    return (
        <div className="p-5">
            <h2 className="my-3">Hi, Welcome to Task Hero! Login here to start your adventure!</h2>
            {
                error && <h1>{error}</h1>
            }
            <form className="d-inline-block mx-5"onSubmit={handleSubmit}>
                <div className="mb-3 d-flex justify-content-center gap-3">
                    <label >Username:</label>
                    <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>

                <div className="mb-3 d-flex justify-content-center gap-3">
                    <label >Password:</label>
                    <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    
                </div>
                <input className="bg-success text-white mx-auto" type="submit" value="Login"/>
            </form>
        </div>
    )
}

export default ChildLoginForm