import React from 'react'
import Logout from './Logout';
import ChildLogout from './ChildComponents/ChildLogout'

const NavBar = ({button}) => {
    return (
        <div className="d-flex justify-content-between align-items-center px-4" style={{height:75, backgroundColor:"#23292F"}}>
            <h1 className="text-light ">Task<span className="fst-italic">Hero</span></h1>
            <Logout/>
        </div>
    )
}

export default NavBar