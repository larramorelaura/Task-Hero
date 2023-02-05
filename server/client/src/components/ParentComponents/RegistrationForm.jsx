import React, {useState}  from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'



const RegistrationForm = () => {
    const[firstName, setFirstName]=useState("");
    const [lastName, setLastName]= useState("");
    const [email, setEmail]= useState("");
    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [role, setRole]= useState("parent");
    const [errors, setErrors]=useState([])

    const navigate= useNavigate();

    const handleSubmit=(e)=>{
        console.log(firstName,lastName,email,password,confirmPassword)
        e.preventDefault();
        axios.post("http://localhost:8000/api/parent/register", {firstName, lastName, email, username, password, role, confirmPassword}, {withCredentials:true})
        .then(res=>{
            console.log(res.data)
            const userId=res.data.user._id
            navigate(`/taskhero/parent/dashboard/${userId}`)
        })
        .catch(err=>{
            console.log(err)
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            
            const errorMsgs = []; // Define a temp error array to push the messages in
            
            for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                errorMsgs.push(errorResponse[key].message)
            }
            
            // Set Errors
            setErrors(errorMsgs);
            
        })
    }

    return (
        <div>
            {
                errors.map((error,i)=>(
                    <p key={i}>{error}</p>
                ))
            }
            <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex justify-content-between">
                    <label >First Name:</label>
                    <input type="text" name="firstName" onChange={(e)=>setFirstName(e.target.value)} />
                </div>

                <div className="mb-3 d-flex justify-content-between">
                    <label >Last Name:</label>
                    <input type="text" name="lastName" onChange={(e)=>setLastName(e.target.value)}/>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                    <label >Email:</label>
                    <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                    <label >Password:</label>
                    <input type="password" name="password"onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                    <label >Confirm Password:</label>
                    <input type="password" name="confirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>


                <input className="bg-success text-white" type="submit" value="Register"/>
            </form>
        </div>
    ) 
}

export default RegistrationForm