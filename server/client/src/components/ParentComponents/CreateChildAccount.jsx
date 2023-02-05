import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import SideNavBar from '../SideNavBar';
import NavBar from '../NavBar';

const CreateChildAccount = () => {
    const [childName, setChildName]= useState("");
    const [childUsername, setChildUsername]= useState("");
    const [childPassword, setChildPassword]= useState("");
    const [childConfPassword, setChildConfPassword]= useState("");
    const [user, setUser]=useState([])
    const [errors, setErrors]= useState([]);
    const [role, setRole]= useState("child")
    const {id}=useParams()
    const [parent]=useState(id)
    

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/parent/view/${parent}`, {withCredentials:true})
        .then(res=>{
            console.log(res.data)
            setUser(res.data)
        })
        .catch(err=>{console.log(err)})
    },[])

    const navigate= useNavigate();

    const handleSubmit=(e)=>{
        console.log(childName, childUsername, childPassword, childConfPassword)
        e.preventDefault();
        console.log(user[0].accessToken)
        axios.post("http://localhost:8000/api/child/register", {childName, childUsername, childPassword, parent, role, childConfPassword, user}, {
            headers: {
                'x-access-token': user[0].accessToken
            }
        })
        .then(res=>{
            navigate(`/taskhero/parent/dashboard/${parent}`)
        })
        .catch(err=>{
            console.log(err.response.data.error);
            if (err.response.data.error) {setErrors(err.response.data.error)}
            else{
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            console.log(errorResponse)
            const errorMsgs = []; // Define a temp error array to push the messages in
            
            for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                errorMsgs.push(errorResponse[key].message)
            }
            
            // Set Errors
            setErrors(errorMsgs);}
            
        })
    }

    return (
        <div>
            <nav>
                <NavBar/>
            </nav>
            <div className="d-flex" style={{height:"100vh"}}>
                <SideNavBar id={id}/>
                <div className="p-5">
                    <h2>Add a child here:</h2>
                    
                    
                    
                    <div className="d-flex justify-content-center">
                        <form onSubmit={handleSubmit} >
                            
                            {   
                            errors&&
                            // errors.length<=1 ?
                            <p className="text-danger">{errors}</p>
                            // :
                            // errors.map((error,i)=>(
                            //     <p key={i}>{error}</p>
                            // ))
                        }
                            <div className="mb-3 d-flex justify-content-between gap-3">
                                <label >Child's Name:</label>
                                <input type="text" name="childName" onChange={(e)=>setChildName(e.target.value)} />
                            </div>

                            <div className="mb-3 d-flex justify-content-between gap-3">
                                <label >Please provide a unique username for your child's login:</label>
                                <input type="text" name="childUsername" onChange={(e)=>setChildUsername(e.target.value)}/>
                            </div>

                            <div className="mb-3 d-flex justify-content-between gap-3">
                                <label >Please provide a password for your child's login:</label>
                                <input type="password" name="childPassword"onChange={(e)=>setChildPassword(e.target.value)}/>
                            </div>

                            <div className="mb-3 d-flex justify-content-between gap-3">
                                <label >Please confim the password:</label>
                                <input type="password" name="childConfPassword" onChange={(e)=>setChildConfPassword(e.target.value)}/>
                            </div>


                            <input className="btn" style={{backgroundColor: "#C3C9E9", color: "8B8982"}} type="submit" value="Register"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateChildAccount