import React, { useState} from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import ChildrenView from '../../components/ParentComponents/ChildrenView';
import ChoresView from '../../components/ParentComponents/ChoresView';
import RewardsView from '../../components/ParentComponents/RewardsView';
import SideNavBar from '../../components/SideNavBar';
import NavBar from '../../components/NavBar';
import styles from '../../components/ParentDashboard.module.css'

const ParentDashboard = () => {
    const [user, setUser]=useState([]);
    const {id}=useParams();
    const [socket] = useState(() => io(':8000'));
    

    
    return (
        <div >
            <nav>
                <NavBar button={true}/>
            </nav>
            <div className="d-flex"  >
            <SideNavBar id={id}/>
            <div  className={styles.parentContainer} style={{height:"100vh"}}>
                <h1 className="text-center mb-5">Parent Dashboard</h1>
                <div className="border border-dark p-3 mb-5 rounded">
                    <h2>Child Leaderboard</h2>
                    <ChildrenView id={id} socket={socket}/>
                </div>
                <div className="d-flex gap-5">
                <div className="border border-dark p-3 rounded">
                    <h2>Rewards Requested</h2>
                    <RewardsView completedOnly={true} socket={socket}/>
                </div>
                <div className="border border-dark p-3 rounded">
                    <h2>Tasks Awaiting Approval</h2>
                    <ChoresView completedOnly={true}  socket={socket}/>
                </div>
                </div>
                
                </div>
            </div>
        </div>
    )
}

export default ParentDashboard