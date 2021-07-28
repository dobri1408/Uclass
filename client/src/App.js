import React from 'react';
import Ask from './components/Ask.js';
import Home from './components/pages/HomePage/Home';
import Services from './components/pages/Services/Services';
import Products from './components/pages/Products/Products';
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
import SignUpProf from './components/SignUpProf';
import SignUpElev from './components/SignUpElev';
import { AuthProvider } from './components/contexts/AuthContext';
import Profile from './components/Profile';
import Login from './components/Login';
import UnConnectedPrivateRoute from './components/UnConnectedPrivateRoute'
import ConnectedPrivateRoute from './components/ConnectedPrivateRoute';
import Forgot from './components/Forgot';
import UpdateProfile from './components/UpdateProfile';
import { Provider } from 'react-redux';
import ClassRegister from './components/ClassRegister';
import FileUpload from './components/fileupload';
import TextEditor from './components/texteditor';
import {v4 as uuidV4} from 'uuid';
import Container from './components/Board/Container';
import Classroom from '../src/components/lessons/Classroom';
import Class from '../src/components/lessons/class';
import TeacherTimetable from './components/Timetables/TeacherTimetable';
import RoomPage from './components/RoomPage/RoomPage'
import StartMeeting from './components/StartMeeting/StartMeeting';
import JoinRoom from './components/JoinRoom/JoinRoom';
import {store} from './store/store'
import { PersistGate } from "redux-persist/integration/react";
import {persistor} from './store/data';
import BoardAPI from './components/BoardAPI';
import StudentLogin from './components/Student/LoginStudent';
import LoginStudent from './components/Student/LoginStudent';
import ProfileStudent from './components/Student/ProfileStudent';
import ClassesStudent from './components/Student/ClassesStudent.js';
import ClassroomStudent from './components/Student/ClassroomStudent.js';



function App() {

  return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
      <AuthProvider>
      <Router>
      <Switch>
{/*-------------------------------------------------------------------------------------- */}
        <UnConnectedPrivateRoute path='/' exact comp={Home} />
{/*-------------------------------------------------------------------------------------- */}
        <UnConnectedPrivateRoute path='/signprofesor' comp={SignUpProf} />  
{/*-------------------------------------------------------------------------------------- */}
        <UnConnectedPrivateRoute path='/signelev' comp={SignUpElev} />  
{/*-------------------------------------------------------------------------------------- */}
        <UnConnectedPrivateRoute path='/studentlogin' comp={LoginStudent} />  
{/*-------------------------------------------------------------------------------------- */}
        <ConnectedPrivateRoute path='/teachertimetable' comp={TeacherTimetable} /> 
       
  

{/*-------------------------------------------------------------------------------------- */}
        <ConnectedPrivateRoute path='/classrooms/:id' comp = {Classroom}>
        </ConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <ConnectedPrivateRoute path='/see-classrooms/:id' comp = {ClassroomStudent}>
        </ConnectedPrivateRoute>

{/*-------------------------------------------------------------------------------------- */}
        <ConnectedPrivateRoute path='/profile' comp = {Profile}>
       
        </ConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <ConnectedPrivateRoute path='/student-profile' comp = {ProfileStudent}>
               
        </ConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <ConnectedPrivateRoute path= "/documents/:id"  comp = {TextEditor}>
        
        </ConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <UnConnectedPrivateRoute path='/login' comp = {Login}>
     
        </UnConnectedPrivateRoute> 
{/*-------------------------------------------------------------------------------------- */}
          <UnConnectedPrivateRoute path="/ask" comp={Ask} />

{/*-------------------------------------------------------------------------------------- */}
        <ConnectedPrivateRoute path='/update-profile' comp={UpdateProfile} />  
{/*-------------------------------------------------------------------------------------- */}
        <UnConnectedPrivateRoute path="/forgot-password" comp={Forgot}/>
{/*-------------------------------------------------------------------------------------- */}
        <ConnectedPrivateRoute path='/classes' comp={Class}>
         
        </ConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <ConnectedPrivateRoute path='/student-classes' comp = {ClassesStudent}>
     
        </ConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <ConnectedPrivateRoute path='/inregistrareclasa' comp={ClassRegister} />


{/*-------------------------------------------------------------------------------------- */} 
        <ConnectedPrivateRoute path='/classes' comp={Class} />
{/*-------------------------------------------------------------------------------------- */}
      </Switch>
      </Router>
      </AuthProvider>
        </PersistGate>
    </Provider>
  );
}

export default App;