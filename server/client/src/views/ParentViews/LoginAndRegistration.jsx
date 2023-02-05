import React  from 'react'

import LoginForm from '../../components/ParentComponents/LoginForm'
import RegistrationForm from '../../components/ParentComponents/RegistrationForm';
import NavBar from '../../components/NavBar'


const LoginAndRegistration = () => {
    return (
        <div style={{height: "100vh"}}>
            <NavBar button={false}/>
            <div className="d-flex p-5 gap-5">
                
                <div>
                    <h1>Register Here</h1>
                    <RegistrationForm/>
                </div>
                <div>
                    <h1>Login Here</h1>
                    <LoginForm/>
                </div>
            </div>
        </div>
    )
}

export default LoginAndRegistration