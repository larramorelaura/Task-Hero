import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import SideNavBar from '../SideNavBar';
import NavBar from '../NavBar';
import ChoresView from './ChoresView';


const ChoreForm = ({socket}) => {
    const [name, setName]= useState("");
    const [pointValue, setPointValue]=useState(0);
    const [errors, setErrors]=useState([]);
    const [user, setUser]=useState([]);
    const {id}=useParams();



    useEffect(()=>{
        console.log(id)
        axios.get(`http://localhost:8000/api/parent/view/${id}`)
        .then(res=>{
            console.log(res.data);
            setUser(res.data);})
        .catch(err=>console.log(err))

        
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:8000/api/chore/create/${id}`, {name, pointValue}, {
            headers: {
                'x-access-token': user[0].accessToken
            }})
        .then(res=>{
            console.log("Chore Added", res.data)
            socket.emit("chore added", res.data)
            setName("");
            setPointValue("")
            
        })
        .catch(err=>console.log(err))
    }

    return (
        <div>
            <nav>
                <NavBar/>
            </nav>
            <div className="d-flex" style={{height:"100%"}} >
                <SideNavBar id={id}/>
                <div className="p-5">
                    <h2 className="my-3">Add a task! </h2>
                    {
                        errors && <h1>{errors}</h1>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 d-flex justify-content-between">
                            <label >Task Name:</label>
                            <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>

                        <div className="mb-3 d-flex justify-content-between">
                            <label >Point Value:</label>
                            <input type="number" name="pointValue" value={pointValue} onChange={(e)=>setPointValue(e.target.value)}/>
                        </div>
                        <input className="btn" style={{backgroundColor: "#C3C9E9", color: "8B8982"}} type="submit" value="Create Task"/>
                    </form>
                    <div className="my-5">
                        <h2>Your Tasks</h2>
                        <ChoresView socket={socket}/>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default ChoreForm