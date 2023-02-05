import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import styles from '../ChildHUD.module.css'

const ChildHUD = ({id}) => {
    const [rewards, setRewards]=useState([]);
    const [tasks, setTasks]=useState([]);
    const [child, setChild]=useState({});
    const [maxProgress, setMaxProgress]=useState(0);
    const [socket] = useState(() => io(':8000'));
    const [socketToggle, setSocketToggle]= useState(false)

    useEffect(()=>{
        setSocketToggle(false)
        axios.get(`http://localhost:8000/api/view/child/${id}`)
        .then(res=>{
            setChild(res.data)
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
        
        .catch(err=>console.log(err))

        socket.on("reward approved", rewardUpdated=>{
            setSocketToggle(true)
        })
        socket.on("update approved chores", updatedTask=>{
            setSocketToggle(true)
        })

        return () => {
            setSocketToggle(false)
            socket.off("reward approved");
            socket.off("update approved chores");
        };
    },[socket, socketToggle])

    useEffect(() => {
        const possiblePoints = rewards.filter((reward) => reward.cost > child[0].rewardPoints).map((reward, i) => reward.cost)
        setMaxProgress(possiblePoints[0])
    }, [rewards, child, socket, socketToggle])

    

    return (
        <div>
            <h1>{child[0]?.username}</h1>
            <p>Reward Points: {child[0]?.rewardPoints}</p>
            <p>Progress to next reward:</p>
            <progress
                value={child[0]?.rewardPoints}
                max={maxProgress}
            />
        </div>
    )
}

export default ChildHUD