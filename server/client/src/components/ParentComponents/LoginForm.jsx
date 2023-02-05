import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const LoginForm = () => {
    const[email, setEmail]=useState("");
    const [user, setUser] =useState([])
    const[password, setPassword]=useState("")
    const[error, setError]=useState("")
    const navigate= useNavigate();


    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/parent/login', {email, password}, {withCredentials:true})
        .then(res=>{
            // localStorage.setItem('user', JSON.stringify(res.data.user))
            console.log(res.data)
            const userId=res.data.data.userid
            console.log(userId)
            navigate(`/taskhero/parent/dashboard/${userId}`)
        })
        
            
        
        
        .catch(err=>{
            setError("Invalid credentials");
        })
    }
    return (
        <div>
            {
                error && <h1>{error}</h1>
            }
            <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex justify-content-between">
                    <label >Email:</label>
                    <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                    <label >Password:</label>
                    <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <input className="bg-success text-white" type="submit" value="Login"/>
            </form>
        </div>
    )
}

export default LoginForm