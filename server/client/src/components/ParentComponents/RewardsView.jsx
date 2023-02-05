import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import CommentForm from '../CommentForm';



const RewardsView = ({socket, completedOnly}) => {
    const [rewards, setRewards]=useState([]);
    const [updatedReward, setUpdatedReward]=useState({});
    const [updatedChild, setUpdatedChild]=useState({});
    const [socketToggle, setSocketToggle]=useState(false);
    const [isOpen, setIsOpen]=useState(false);
    const [msgId, setMsgId]= useState("")
    const {id}=useParams();
    const [value]= useState("");


    // const togglePopup = () => {
    //     setIsOpen(!isOpen);
    //     }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/parent/view/rewards/${id}`)
        .then(res=>{
            console.log(res.data)
            setRewards(res.data);
            setSocketToggle(false)
        })
        .catch(err=>console.log(err))
                        
        socket.on("reward awaiting approval", rewardUpdate => {
            setRewards(prevRewards => {
                const filteredRewards = prevRewards.filter(prevReward => prevReward._id !== rewardUpdate._id);
                return [rewardUpdate, ...filteredRewards];
                });
                console.log(rewards)
                setSocketToggle(true);
            });

        socket.on("reward approved", rewardUpdate => {
            setRewards(prevRewards => {
                const filteredRewards = prevRewards.filter(prevReward => prevReward._id !== rewardUpdate._id);
                return [...filteredRewards, rewardUpdate];
                });
                console.log(rewards)
                setSocketToggle(true);
            });
            
            socket.on("update added reward", rewardUpdate=>{
                setSocketToggle(true)
            });

            return () => {
                setSocketToggle(false)
                socket.off("reward awaiting approval");
                socket.off("reward approved")
                socket.off("update added reward")
            };    
                

        },[socket, socketToggle])
    

    const assignReward=(childId, cost)=>{
        axios.put(`http://localhost:8000/api/child/rewards/edit/${childId}`, {cost})
        .then(res=>{
            setUpdatedChild(res.data)
            // setMsgId(childId)
        })
        .catch(err=>{console.log(err)})}


    const updateRewardStatus=(rewardId)=>{
        axios.put(`http://localhost:8000/api/rewards/edit/${rewardId}/`, {value})
        .then(res=>{
            setUpdatedReward(res.data)
            socket.emit("reward approval", res.data)
        })
        .catch(err=>{
            console.log(err)
        })
        }
    


    const handleClick=(e, childId, rewardId, cost)=>{
        e.preventDefault();
        // togglePopup()
        assignReward(childId,  cost);
        updateRewardStatus(rewardId)
    }


    return (
        <div>
            <div>
            
                <table className="table" >
                    <thead>
                        <tr>
                            <th>Reward Description</th>
                            <th>Cost</th>
                            <th>Give Reward</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   completedOnly?
                            rewards.filter((reward)=> reward.redeemer.length === 24).map((reward, i)=>(
                                <tr key={i}>
                                    <td>{reward.name}</td>
                                <td>{reward.cost}</td>
                                
                                <td>
                                    <button className="btn border-0" style={{backgroundColor: "#C3C9E9"}} disabled={!(reward.redeemer.length===24)} onClick={(e)=>handleClick(e, reward.redeemer, reward._id, reward.cost)}>Assign Reward</button>
                                </td>
                                </tr>
                            ))
                            :   
                        
                            rewards&&
                            rewards.map((reward, i)=>(
                            <tr key={i}>
                                <td>{reward.name}</td>
                                <td>{reward.cost}</td>
                                
                                <td>
                                    <button className="btn border-0" style={{backgroundColor: "#C3C9E9"}} disabled={!(reward.redeemer.length===24)} onClick={(e)=>handleClick(e, reward.redeemer, reward._id, reward.cost)}>Assign Reward</button>
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

export default RewardsView