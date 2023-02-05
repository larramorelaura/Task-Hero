import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import Reward from "../assets/png/Reward.png"
import Home from "../assets/png/Home.png"
import Child from "../assets/png/Child.png"
import Chores from "../assets/png/Chores.png"


const SideNavBar = (props) => {
    const[selected, setSelected]=useState("")
    return (
        <div  style={{ backgroundColor:"#23292F"}} >
            
            <nav className="px-3 mt-4">
                <ul style={{listStyle:"none"}}>
                    <li>
                        <Link to={`/taskhero/parent/dashboard/${props.id}`} className={selected === 'home' ? 'active' : ''} onClick={() => setSelected('home')}>
                            <img className="" src={Home} alt=""/>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/taskhero/parent/create/reward/${props.id}`} className={selected === 'reward' ? 'active' : ''} onClick={() => setSelected('reward')}>
                            <img className="mt-4" src={Reward} alt=""/>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/taskhero/parent/create/chore/${props.id}`} className={selected === 'tasks' ? 'active' : ''} onClick={() => setSelected('reward')}>
                            <img className="mt-4" src={Chores} alt=""/>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/taskhero/parent/addchildaccount/${props.id}`} className={selected === 'child' ? 'active' : ''} onClick={() => setSelected('reward')}>
                            <img className="mt-4" src={Child} alt=""/>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SideNavBar