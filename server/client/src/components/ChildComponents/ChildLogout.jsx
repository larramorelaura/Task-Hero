import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ChildLogout = () => {
    const navigate=useNavigate();
    const logout=()=>{
        axios.post('http://localhost:8000/api/child/logout',{}, {withCredentials:true})
        .then(res=>{
            console.log(res.data);
            navigate('/taskhero/child/login')
        })
        .catch(err=>console.log(err))
    }
    return (
        <div>
            <button className="btn" style={{backgroundColor: "#C3C9E9", color: "8B8982"}} onClick={logout}>Logout</button>
        </div>
    )
}

export default ChildLogout