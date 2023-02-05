import React, {useEffect, useState} from 'react';
import ChildSideNav from '../../components/ChildComponents/ChildSideNav';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import ChildNavBar from '../../components/ChildComponents/ChildNavBar';
import styles from '../../components/ChildViews.module.css'
import ChildHUD from '../../components/ChildComponents/ChildHUD';

const ChildChores = () => {
    const {id}= useParams();
    const [tasks, setTasks]= useState([]);
    const [rewards, setRewards]=useState([])
    const [updatedTask, setUpdatedTask]=useState({});
    const [errors, setErrors]= useState([]);
    const navigate= useNavigate();
    const [socketToggle, setSocketToggle]=useState(false)
    const [socket] = useState(() => io(':8000'));
    const [updateToggle, setUpdateToggle]= useState(false)

    const taskStatusUpdate=(childId, value)=>{
        axios.put(`http://localhost:8000/api/chore/edit/${childId}/`, {value})
        .then(res=>{
            console.log(res.data)
            setUpdatedTask(res.data)
            socket.emit("chore awaiting approval", res.data)
        })
        .catch(err=>console.log(err))
    }

    const handleClick=(e, taskId, status)=>{
        e.preventDefault();
        taskStatusUpdate(taskId, status);
        setUpdateToggle(true)
        
    }

    useEffect(() => {
        setSocketToggle(false)
        setUpdateToggle(false)
        axios.get(`http://localhost:8000/api/view/chores/${id}`)
        .then(res=>{
            console.log(res.data)
            setTasks(res.data)
        })
        .catch(err=>{console.log(err)})

        socket.on("update approved chores", updatedTask => {
            setSocketToggle(true);
        });
        
        socket.on("update added chores", addedChore => {
            setSocketToggle(true);
        });

        socket.on("chore completed", addedChore => {
            setSocketToggle(true);
        });
        socket.on("back in queue", addedChore => {
            setSocketToggle(true);
        });
    
        return () => {
            setSocketToggle(false);
            socket.off("update approved chores");
            socket.off("update added chores");
            socket.off("chore completed");
            socket.off("back in queue");
            socket.off("reward approved");
            
        };

    }, [socketToggle, updateToggle]);

    return (
        <div className={styles.container}>
            <nav>
                <ChildNavBar/>
            </nav>
            <div className="d-flex" style={{height:"100%"}} >
                <ChildSideNav id={id}/>
                <div className="p-5">
                    <ChildHUD id={id}/>
                    <div>
                        <h2>Daily Quests!</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>QuestLog</th>
                                    <th>Quest Rewards</th>
                                    <th>Start this adventure!</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    tasks.filter(task => task.status === "available").map((task, i)=>(
                                        <tr key={i}>
                                            <td>{task.name}</td>
                                            <td>{task.pointValue} points</td>
                                            <td >
                                                <button className="btn mx-3" style={{backgroundColor: "#ffae42", color: "8B8982"}} onClick={(e)=>handleClick(e, task._id, `claimedby-${id}` )}>Set forth</button>
                                            </td>
                                        </tr>   
                                    ))

                                
                                }
                            </tbody>
                        </table>
                        <h2>Quests in Progress</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>QuestLog</th>
                                    <th>Quest Rewards</th>
                                    <th>Quest Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    tasks.filter(task => task.status === `claimedby-${id}`).map((task, i)=>(
                                        <tr key={i}>
                                            <td>{task.name}</td>
                                            <td>{task.pointValue} points</td>
                                            <td >
                                                <button className="btn btn-secondary mr-3"  onClick={(e)=>handleClick(e, task._id, "available" )} >Abandon</button>
                                                <button className="btn mx-3" style={{backgroundColor: "#ffae42", color: "8B8982"}} onClick={(e)=>handleClick(e, task._id, `${id}` )}>Complete</button>
                                            </td>
                                        </tr>   
                                    ))

                                
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChildChores