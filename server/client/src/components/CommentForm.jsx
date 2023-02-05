import React, {useState} from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const CommentForm = (props) => {
    const [comment, setComment]= useState("")
    const { childId, id, togglePopup }= props;
    const [socket] = useState(() => io(':8000'));
    
    // // const [taskId, setTaskId]= useState(`${task._id}`)
    // console.log(props.task)

    const handleSubmit=(e)=>{
        e.preventDefault();
        const childid=props.childId
        axios.post(`http://localhost:8000/api/parent/message/${props.id}`, {comment, childid } )
        .then(res=>{
            console.log(res)
            socket.emit("new message", res.data)
        })
        .catch(err=>{console.log(err)})
        
        props.togglePopup();
    }

    return (
        <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "410px",
            height: "200px",
            backgroundColor: "#C3C9E9",
            border: "1px solid black",
            boxShadow: "4px 4px 5px 0px rgba(0,0,0,0.75)",
            transition: "all 0.3s ease-in-out",
            padding: "10px"
            }} >
            <form onSubmit={(e)=>handleSubmit(e)}>

                <label>Comment for child: </label>
                <textarea style={{backgroundColor: "#DDDDE3" }} cols="50" rows="4" onChange={(e)=>setComment(e.target.value)} ></textarea>
                <input className="btn text-light" style={{backgroundColor: "#36454f"}} type="submit" value="Send Comment"/>
            </form>
        </div>
    )
}

export default CommentForm