import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import CommentForm from '../CommentForm';

const ChoresView = ({socket, completedOnly}) => {
    
    const [errors, setErrors]=useState([])
    const [msgId, setMsgId]=useState("")
    const [tasks, setTasks]=useState([])
    const [task, setTask]=useState({})
    // const [taskFeedback, setTaskFeedback]= useState({})
    const [socketToggle, setSocketToggle]=useState(false)
    const {id}=useParams();
    
    
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
    setIsOpen(!isOpen);
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/view/chores/${id}`)
        .then(res=>{
            console.log(res.data)
            setTasks(res.data)
            setSocketToggle(false)
        })
        .catch(err=>{console.log(err)});

        const eventListener1 = socket.on("chore completed", updatedTask => {
            setTasks(prevTasks => {
                const filteredTasks = prevTasks.filter(prevTask => prevTask._id !== updatedTask._id);
                return [...filteredTasks, updatedTask];
                
                });
                setSocketToggle(true);
            });

        const eventListener2 = socket.on("update approved chores", updatedTask => {
            setTasks(prevTasks => {
                const filteredTasks = prevTasks.filter(prevTask => prevTask._id !== updatedTask._id);
                return [...filteredTasks];
                
                });
                setSocketToggle(true);
            });

            socket.on("back in queue", updatedTask=>{
                setTasks(prevTasks => {
                    const filteredTasks = prevTasks.filter(prevTask => prevTask._id !== updatedTask._id);
                    return [...filteredTasks];
                    
                    });
                    setSocketToggle(true);
            });

            socket.on("update added chores", updatedTask=>{
                setSocketToggle(true)
            })
            
            return () => {
                setSocketToggle(false)
                socket.off("back in queue")
                socket.off("chore completed", eventListener1);
                socket.off("update approved chores", eventListener2);
            };

        

    }, [socket, socketToggle]);

    const handleClick=(e, childId, rewardPoints, taskObj)=>{
        e.preventDefault();
        setMsgId(childId)
        setTask(taskObj)
        let value="available"
        socket.emit("chore approved", task )
        togglePopup()
        axios.put(`http://localhost:8000/api/child/${childId}`, {rewardPoints})
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>console.log(err))
        axios.put(`http://localhost:8000/api/chore/edit/${taskObj._id}`, {value})
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{console.log(err)})
    }

    const handleDeny=(e, childId, taskObj)=>{
        e.preventDefault();
        setMsgId(childId)
        // setTaskFeedback(task.Obj)
        let value=`claimedby-${childId}`;
        togglePopup()
        axios.put(`http://localhost:8000/api/chore/edit/${taskObj._id}`, {value})
        .then(res=>{
            console.log(res)
            socket.emit("try again", res.data)
        })
        .catch(err=>{console.log(err)})
    }

    

    return (
        <div>
            {isOpen && 
                <CommentForm togglePopup={togglePopup} id={id} childId={msgId}/>
            }
            <div>
                
                <table className="table" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Point Value</th>
                            <th>Complete Requests</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            completedOnly?
                            tasks.filter((task)=> task.status.length ===24).map((task, i)=>(
                                <tr key={i}>
                                <td>{task.name}</td>
                                <td>completed</td>
                                <td>{task.pointValue}</td>
                                <td>
                                    <button className="btn btn-sm border-0 my-3 mx-3" style={{backgroundColor: "#C3C9E9", color: "8B8982"}} disabled={task.status.length < 10 || task.status.length > 25} onClick={(e)=>handleClick(e, task.status, task.pointValue, task)}>Approve</button>
                                    <button className=" btn btn-sm border-0 " style={{backgroundColor: "#C3C9E9", color: "8B8982"}} disabled={task.status.length < 10 || task.status.length > 25} onClick={(e)=>handleDeny(e, task.status, task)}>Try Again</button>
                                </td> 
                            </tr>
                            )):
                            tasks&&
                            tasks.map((task, i)=>(
                                

                            <tr key={i}>
                                <td>{task.name}</td>
                                <td>{task.status.length < 10   ? task.status: task.status.length > 25 ?  "claimed" : "completed"}</td>
                                <td>{task.pointValue}</td>
                                <td>
                                    <button className="btn btn-sm border-0 my-3 mx-3" style={{backgroundColor: "#C3C9E9", color: "8B8982"}} disabled={task.status.length < 10 || task.status.length > 25} onClick={(e)=>handleClick(e, task.status, task.pointValue, task)}>Approve</button>
                                    <button className=" btn btn-sm border-0 " style={{backgroundColor: "#C3C9E9", color: "8B8982"}} disabled={task.status.length < 10 || task.status.length > 25} onClick={(e)=>handleDeny(e, task.status, task)}>Try Again</button>
                                </td> 
                            </tr>
                            
                            ))
                            
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ChoresView