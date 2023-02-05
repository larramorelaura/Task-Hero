import React, {useState, useEffect} from 'react'
// import {useParams} from 'react-router-dom';
import axios from 'axios'

const ChildrenView = ({id, socket}) => {
    const [children, setChildren]=useState([]);
    const [updatedChild, setUpdatedChild]= useState({});
    const [updateToggle, setUpdateToggle]=useState(false)
    const [socketToggle, setSocketToggle]=useState(false)
    // const {id, socket}=props

    // useEffect(()=>{
    //     axios.get(`http://localhost:8000/api/parent/view/allchildren/${parentId}`)
    //     .then(res=>{
    //         setChildren(res.data)
    //     })
    //     .catch(err=>{console.log(err)})
    // },[])

    useEffect(() => {
        
        setSocketToggle(false)

        axios.get(`http://localhost:8000/api/parent/view/allchildren/${id}`)
        .then(res=>{
            console.log(res.data)
            setChildren(res.data)
        })
        .catch(err=>console.log(err));

        socket.on("reward approved", rewardUpdated => {
            setSocketToggle(true);
        });
        
        
        socket.on("update approved chores", updatedTask => {
            setSocketToggle(true);
        });
        
    
        return () => {
            setSocketToggle(false);
            socket.off("reward approved");
            socket.off("update approved chores")
            if(!children){console.log("no children")}
        };
    }, [socketToggle, socket]);

    const handleClick=(e, childId)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/child/points/${childId}`)
        .then(res=>{
            console.log(res.data)
            
            socket.emit("reward approval", res.data)
        })
        .catch(err=>{console.log(err)})
    }

    return (
        

        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Children</th>
                        <th>Points</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        children.map((child, i)=>(
                        <tr key={i}>
                            <td>{child.name}</td>
                            <td>{child.rewardPoints}</td>
                            <td>
                                <button className="btn mr-3 color-0" style={{backgroundColor: "#C3C9E9", color: "8B8982"}}>Edit</button>
                                <button className="btn mx-3" style={{backgroundColor: "#C3C9E9", color: "8B8982"}} onClick={(e)=>handleClick(e, child._id)}>Award A Point</button>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ChildrenView