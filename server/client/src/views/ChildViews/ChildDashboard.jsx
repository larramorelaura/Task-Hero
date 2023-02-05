import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import ChildSideNav from '../../components/ChildComponents/ChildSideNav';
import ChildNavBar from '../../components/ChildComponents/ChildNavBar';
import styles from '../../components/ChildDashboard.module.css'
import ChildHUD from '../../components/ChildComponents/ChildHUD';

const ChildDashboard = ({socket}) => {
    const {id}= useParams();
    const [child, setChild]= useState({});
    const [messages, setMessages]= useState([]);
    const [tasks, setTasks]=useState([]);
    const [rewards, setRewards]=useState([]);
    const [socketToggle, setSocketToggle]= useState(false)

    useEffect(()=>{
        setSocketToggle(false)
        axios.get(`http://localhost:8000/api/view/child/${id}`)
        .then(res=>{
            setChild(res.data)
        })
        .catch(err=>{console.log(err)})
        axios.get(`http://localhost:8000/api/view/child/messages/${id}`)
        .then(res=>{
            console.log(res.data)
            setMessages(res.data)
        })
        .catch(err=>{console.log(err)})

        axios.get(`http://localhost:8000/api/view/chores/${id}`)
        .then(res=>{
            console.log(res.data)
            setTasks(res.data.filter(task => task.status === `claimedby-${id}`))
        })
        .catch(err=>{console.log(err)})

        axios.get(`http://localhost:8000/api/parent/view/rewards/${id}`)
        .then(res=>{
            console.log(res.data);
            setRewards(res.data);
            
        })

        socket.on("incoming message", msg=>{
            
            setSocketToggle(true);
                    });
            
        
        return () => {
            setSocketToggle(false);
            socket.off("incoming message")
            
        };

    }, [socket, socketToggle])
    return (
        <div className={styles.dashboardContainer}>
            <nav>
                <ChildNavBar/>
            </nav>
            <div className="d-flex" style={{height:"100vh"}} >
                <ChildSideNav id={id}/>
                <div className="p-5" >
                    <ChildHUD id={id}/>
                    <h2>Welcome back, {child[0]?.username}!</h2>
                    <div>
                        <h3>Latest feedback about your chores! </h3>
                        <ul>
                            {
                                messages &&
                                messages.map((message, i)=>(
                                    i>=messages.length-6 &&
                                <li className={styles.messageBubble} style={{listStyle: "none"}} key={i}>{message.comment}</li>
                                ))
                            
                            }
                        </ul>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default ChildDashboard