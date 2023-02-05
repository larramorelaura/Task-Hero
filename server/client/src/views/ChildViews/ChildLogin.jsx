import React from 'react'
import ChildLoginForm from '../../components/ChildComponents/ChildLoginForm';
import ChildNavBar from '../../components/ChildComponents/ChildNavBar'

const ChildLogin = () => {
    return (
        <div style={{height: '100vh'}}>
            <ChildNavBar/>
            <ChildLoginForm/>
        </div>
    )
}

export default ChildLogin