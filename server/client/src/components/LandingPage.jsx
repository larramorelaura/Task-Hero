import React from 'react';
import {Link} from 'react-router-dom'
import styles from './LandingPage.module.css'
import ChildHero from '../assets/jpeg/ChildHero.jpeg'
import ChildArmsFull from '../assets/png/ChildArmsFull.jpeg'
import ChildLaundry from '../assets/png/ChildLaundry.jpeg'
import ChildMopping from '../assets/jpeg/ChildMopping.jpeg'

const LandingPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.headerImages}>
                {/* <img src={ChildHero} alt="child playing pretend in laundry"/> */}
                {/* <img src={ChildLaundry} alt="child doing laundry"/>
                <img src={ChildMopping} alt="child mopping"/>
                <img src={ChildArmsFull} alt="child arms full of clothes"/> */}
            </div>

            <div className={styles.center}>
                <div className={styles.header} >
                    <h1>Task<span className="fst-italic">Hero</span></h1>
                </div>
                
            </div>
            <div className={styles.flexbox}>
                <div className={styles.appImages}>
                    <div>PLACEHOLDER</div>
                </div>
                <div className={styles.infoTag}>
                    <h2>Empowering kids with fun and responsibility, one chore quest at a time!</h2>
                    <h3>Get started today!</h3>
                    <div className={styles.login}>
                        <h4>Have an account?</h4>
                        <Link to={'/taskhero/registration'} ><button>Parent Login</button></Link>
                        <Link to={'/taskhero/child/login'}><button>Child Login</button></Link>
                    </div>
                    <div className={styles.login}>
                        <h4>Need to create an account?</h4>
                        <Link to={'/taskhero/registration'} ><button>Register Here</button></Link>
                    </div>
                </div>
            </div>
            
            <div className={styles.appBenefits}>
                <div className={styles.benefit}>
                    <div>Image holder</div>
                    <p><span>Motivating kids to complete chores: </span>By presenting chores as exciting quests, TaskHero, encourages kids to take an active role in household tasks and fosters responsibility.</p>
                </div>
                <div className={styles.benefit}>
                    <p><span>Streamlining household tasks: </span>Parents can esily input and manage their children's chores and rewards, saving time in overseeing household tasks</p>
                    <div>Image holder</div>
                </div>
                <div className={styles.benefit}>
                <div>Image holder</div>
                    <p><span>Encouraging positive behavior: </span>By rewarding kids for completing tasks, TaskHero fosters a sense of accomplishment and helps promot positive behavior</p>
                </div>
                <div className={styles.benefit}>
                
                    <p><span>Improving Communication: </span>Parents can send their children feedback on chores completed in real time, including instances where a child needs to redo a task in order to get a completion.</p>
                    <div>Image holder</div>
                </div>
                <div className={styles.benefit}>
                <div>Image holder</div>
                    <p><span>Making Chores Fun: </span>With the engaging interface, and fun quest formatting for tasks, TaskHero transforms your children's chores into fun mini adventures!</p>
                </div>
            </div>
        </div>
    )
}

export default LandingPage