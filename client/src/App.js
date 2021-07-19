import React, {useRef, useState} from 'react';
import './App.css';
import Home from './components/pages/HomePage/Home';
import Services from './components/pages/Services/Services';
import Products from './components/pages/Products/Products';
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
import SignUpProf from './components/SignUpProf';
import SignUpElev from './components/SignUpElev';
import { AuthProvider } from './components/contexts/AuthContext';
import Profile from './components/Profile';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Forgot from './components/Forgot';
import UpdateProfile from './components/UpdateProfile';
import { Provider } from 'react-redux';
import ClassRegister from './components/ClassRegister';
import FileUpload from './components/fileupload';
import TextEditor from './components/texteditor';
import {v4 as uuidV4} from 'uuid';
import {store} from './store/store'
import TimeTable from '../src/components/TimeTable';
import Container from './components/Board/Container';
import Classroom from '../src/components/lessons/Classroom';
import Class from '../src/components/lessons/class';
import TeacherTimetable from './components/Timetables/TeacherTimetable';
import RoomPage from './components/RoomPage/RoomPage'
import StartMeeting from './components/StartMeeting/StartMeeting';
import JoinRoom from './components/JoinRoom/JoinRoom';



function App() {

  const [meetingsData, setMeetingsData] = useState([]);
  const [userData, setUserData] = useState([]);
  return (
    <Provider store={store}>
      <AuthProvider>
      <Router>
      <Switch>
{/*-------------------------------------------------------------------------------------- */}
        <Route path='/' exact component={Home} />
{/*-------------------------------------------------------------------------------------- */}
        <Route path='/services' component={Services} />
{/*-------------------------------------------------------------------------------------- */}
        <PrivateRoute path='/products' component={Products} />
{/*-------------------------------------------------------------------------------------- */}
        <Route path='/signprofesor' component={SignUpProf} />  
{/*-------------------------------------------------------------------------------------- */}
        <Route path='/signelev' component={SignUpElev} />  
{/*-------------------------------------------------------------------------------------- */}
        <PrivateRoute path='/teachertimetable'>
          <TeacherTimetable data={{meetingsData: meetingsData}}/>
        </PrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <PrivateRoute path ='/startmeeting'>
          <StartMeeting/>
        </PrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <PrivateRoute path ='/room'>
          <RoomPage/>
        </PrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <PrivateRoute path ='/join-room'>
          <JoinRoom/>
        </PrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <PrivateRoute path='/classrooms/:id'>
          <Classroom data={{userData: userData, meetingsData: meetingsData}}/>
        </PrivateRoute>
{/*-------------------------------------------------------------------------------------- */}s  
        <PrivateRoute path='/profile'>
          <Profile data={{userData: userData, meetingsData: meetingsData}}/>
        </PrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <Route path = "/" exact>
          <Redirect to ={`/documents/${uuidV4()}`}/>
        </Route>
{/*-------------------------------------------------------------------------------------- */}
        <PrivateRoute path= "/documents/:id" >
          <TextEditor/>
        </PrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <Route path='/login'>
          <Login data={{
            setUserData: setUserData, 
            setMeetingsData: setMeetingsData, 
            meetingsData: meetingsData
          }}/>
        </Route> 
{/*-------------------------------------------------------------------------------------- */}
        <PrivateRoute path='/update-profile' component={UpdateProfile} />  
{/*-------------------------------------------------------------------------------------- */}
        <Route path="/forgot-password" component={Forgot}/>
{/*-------------------------------------------------------------------------------------- */}
        <PrivateRoute path='/classes'>
          <Class data={{userData: userData, meetingsData: meetingsData}}/>
        </PrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <PrivateRoute path='/inregistrareclasa' component={ClassRegister} />
{/*-------------------------------------------------------------------------------------- */}
        <Route path='/fileupload' component={FileUpload} />
{/*-------------------------------------------------------------------------------------- */}
        <Route path='/texteditor' component={TextEditor} />
{/*-------------------------------------------------------------------------------------- */}       
        <Route exact path='/board/:id'>
          <Container/>
        </Route>
{/*-------------------------------------------------------------------------------------- */} 
        <Route path='/classes' component={Class} />
{/*-------------------------------------------------------------------------------------- */}
        <Route path='/board' component={Container}/>
{/*-------------------------------------------------------------------------------------- */}
      </Switch>
      </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
