
import './App.css';
import {useState} from 'react';
import { Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import LoginAndRegistration from './views/ParentViews/LoginAndRegistration';
import CreateChildAccount from './components/ParentComponents/CreateChildAccount';
import ParentDashboard from './views/ParentViews/ParentDashboard';
import ChildDashboard from './views/ChildViews/ChildDashboard';
import ChildLogin from './views/ChildViews/ChildLogin';
import RewardForm from './components/ParentComponents/RewardForm';
import ChoreForm from './components/ParentComponents/ChoreForm';
import ChildRewards from './views/ChildViews/ChildRewards';
import ChildChores from './views/ChildViews/ChildChores';
import { io } from 'socket.io-client';


function App() {
  const [socket] = useState(() => io(':8000'));
  return (
    // <div className="d-flex" >
      
    <div style={{backgroundColor: '#DDDDE3'}}>
      {/* <nav>
        <NavBar/>
      </nav> */}
      <Routes>
        {/* parent view routes */}
        <Route path='/taskhero/home' element={<LandingPage/>} />
        <Route path='/taskhero/registration' element={<LoginAndRegistration/>} />
        <Route path='/taskhero/parent/dashboard/:id' element={<ParentDashboard/>} />
        <Route path='/taskhero/parent/create/reward/:id' element={<RewardForm socket={socket} />} />
        <Route path='/taskhero/parent/create/chore/:id' element={<ChoreForm socket={socket}/>} />
        <Route path='/taskhero/parent/addchildaccount/:id' element={<CreateChildAccount/>} />

        {/* child view routes */}
        <Route path='/taskhero/child/login' element={<ChildLogin/>} />
        <Route path='/taskhero/child/dashboard/:id' element={<ChildDashboard socket={socket}/>} />
        <Route path='/taskhero/child/chores/:id' element={<ChildChores socket={socket}/>} />
        <Route path='/taskhero/child/rewards/:id' element={<ChildRewards socket={socket}/>} />
      </Routes>
    </div>
    // </div>
  );
}

export default App;
