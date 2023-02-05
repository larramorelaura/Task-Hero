import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import Reward from "../../assets/png/Reward.png"
import Home from "../../assets/png/Home.png"
import Chores from "../../assets/png/Chores.png"


const SideNavBar = (props) => {
    const[selected, setSelected]=useState("")
    return (
        <div  style={{ backgroundColor:"#23292F"}} >
            
            <nav className="px-3 mt-4">
                <ul style={{listStyle:"none"}}>
                    <li>
                        <Link to={`/taskhero/child/dashboard/${props.id}`} className={selected === 'home' ? 'active' : ''} onClick={() => setSelected('home')}>
                            <img className="" src={Home} alt=""/>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/taskhero/child/rewards/${props.id}`} className={selected === 'reward' ? 'active' : ''} onClick={() => setSelected('reward')}>
                            <img className="mt-4" src={Reward} alt=""/>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/taskhero/child/chores/${props.id}`} className={selected === 'reward' ? 'active' : ''} onClick={() => setSelected('reward')}>
                            <img className="mt-4" src={Chores} alt=""/>
                        </Link>
                    </li>
                    
                </ul>
            </nav>
        </div>
    )
}

export default SideNavBar