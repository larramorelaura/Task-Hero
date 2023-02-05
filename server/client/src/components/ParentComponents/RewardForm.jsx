import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import SideNavBar from '../SideNavBar';
import NavBar from '../NavBar';
import RewardsView from './RewardsView';
import styles from '../ParentDashboard.module.css';


const RewardForm = ({socket}) => {
    const [name, setName]= useState("");
    const [cost, setCost]=useState(0);
    const [user, setUser]=useState({});
    const [errors, setErrors]=useState([]);

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
        axios.post(`http://localhost:8000/api/rewards/create/${id}`, {name, cost}, {
            headers: {
                'x-access-token': user[0].accessToken
            }})
        .then(res=>{
            console.log("Reward Added", res.data);
            socket.emit("reward added", res.data);
            setName("");
            setCost("")
        })
        .catch(err=>console.log(err))
    }


    return (
        <div>
            <nav>
                <NavBar/>
            </nav>
            <div className="d-flex" style={{height:"100vh"}}>
                <SideNavBar id={id}/>
                <div className="p-5">
                    <h2 className="my-3">Create Rewards! </h2>
                {
                    errors && <h1>{errors}</h1>
                }
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 d-flex justify-content-between">
                            <label >Reward description:</label>
                            <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>

                        <div className="mb-3 d-flex justify-content-between">
                            <label >Point Cost:</label>
                            <input type="number" name="cost" value={cost} onChange={(e)=>setCost(e.target.value)}/>
                        </div>
                        <input className="btn" style={{backgroundColor: "#C3C9E9", color: "8B8982"}} type="submit" value="Create Reward"/>
                    </form>
                    <div className="my-5">
                        <h2>Your Rewards</h2>
                        <RewardsView  socket={socket}/>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default RewardForm