import React, {useState, useEffect} from 'react';
import ChildSideNav from '../../components/ChildComponents/ChildSideNav';
import ChildNavBar from '../../components/ChildComponents/ChildNavBar';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import styles from '../../components/ChildViews.module.css'
import ChildHUD from '../../components/ChildComponents/ChildHUD';

const ChildRewards = () => {
    const {id}= useParams();
    const [child, setChild]=useState([])
    const [rewards, setRewards]= useState([]);
    const [rewardUpdate, setRewardUpdate]=useState([])
    const [errors, setErrors]= useState([]);
    const [socketToggle, setSocketToggle]= useState(false)
    const [socket] = useState(() => io(':8000'));

    
    const rewardStatusUpdate=(rewardsId, value)=>{
        axios.put(`http://localhost:8000/api/rewards/edit/${rewardsId}/`, {value})
        .then(res=>{
            console.log(res.data)
            setRewardUpdate(res.data)
            socket.emit("reward chosen", res.data)
        })
        .catch(err=>console.log(err))
    }

    const handleClick=(e, rewardId, childId)=>{
        e.preventDefault();
        rewardStatusUpdate(rewardId, childId);
        
    }

    useEffect(() => {
        setSocketToggle(false)
        axios.get(`http://localhost:8000/api/parent/view/rewards/${id}`)
        .then(res=>{
            console.log(res.data);
            setRewards(res.data);
            
        })
        .catch(err=>{console.log(err)});
        axios.get(`http://localhost:8000/api/view/child/${id}`)
        .then(res=>{
            setChild(res.data)
        })
        .catch(err=>{console.log(err)})

        socket.on("reward approved", rewardUpdated => {
                setSocketToggle(true);
            });
            
        
            
            socket.on("update approved chores", updatedTask => {
                setSocketToggle(true);
            });

            socket.on("update added reward", addedReward => {
                setSocketToggle(true);
            });
            
        
            return () => {
                setSocketToggle(false);
                socket.off("reward approved");
                socket.off("update approved chores")
                socket.off("update added reward")
            };
            
    }, [socketToggle]);

    return (
        <div className={styles.container}>
            <nav>
                <ChildNavBar/>
            </nav>
            <div className="d-flex" style={{height:"100%"}} >
                <ChildSideNav id={id} />
                <div className="p-5">
                    <ChildHUD id={id}/>
                    <div>
                        <h2>You have {child[0]?.rewardPoints} points! See what you can get! </h2>
                        <div className="border border-dark rounded my-5 p-3">
                            <h3>Rewards you can redeem</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Reward</th>
                                        <th>Cost</th>
                                        <th>Do you want to get this? </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        
                                        rewards.filter(reward => reward.cost <= child[0].rewardPoints).map((reward, i)=>(
                                                <tr key={i}>
                                                    <td>{reward.name}</td>
                                                    <td>{reward.cost}</td>
                                                    <button className="btn my-3" style={{backgroundColor: "#ffae42", color: "8B8982"}} onClick={(e)=>handleClick(e, reward._id, `${id}`)} >Redeem Now!</button>
                                                </tr>
                                            ))
                                        
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="border border-dark rounded p-3">
                            <h3>Rewards you can earn</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Reward</th>
                                        <th>Cost</th>
                                        <th>How Much do you need? </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        
                                        rewards.filter(reward => reward.cost > child[0].rewardPoints).map((reward, i)=>(
                                                <tr key={i}>
                                                    <td>{reward.name}</td>
                                                    <td>{reward.cost}</td>
                                                    <td>{reward.cost-child[0].rewardPoints}</td>
                                                </tr>
                                            ))
                                        
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChildRewards