import React from 'react';
import Ask from './components/Ask.js';
import Home from './components/pages/HomePage/Home';
import Services from './components/pages/Services/Services';
import Products from './components/pages/Products/Products';
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
import SignUpProf from './components/SignUpProf';
import SignUpElev from './components/SignUpElev';
import { AuthProvider } from './components/contexts/AuthContext';
import SimpleRoute from './components/SimpleRoute'
import Profile from './components/Profile';
import CreateTest from './components/tests/CreateTest';
import Login from './components/Login';
        import FeedbackAndBugsStudent from './components/FeedbackAndBugsStudent';
        import FeedbackAndBugs from './components/FeedbackAndBugs';
import UnConnectedPrivateRoute from './components/UnConnectedPrivateRoute'
import ConnectedPrivateRoute from './components/ConnectedPrivateRoute';
import TeacherConnectedPrivateRoute from './components/TeacherConnectedPrivateRoute';
import StudentConnectedPrivateRoute from './components/StudentConnectedPrivateRoute'
import Forgot from './components/Forgot';
import UpdateProfile from './components/UpdateProfile';
import Phone from './components/Phone'
import TypeOfTest from './components/tests/TypeOfTest';
import { Provider } from 'react-redux';
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
import TimetableStudent from './components/Student/TimetableStudent.js';

import {BrowserView, MobileView} from 'react-device-detect';

function App() {

  return (
        <>
         <BrowserView>
<Provider store={store}>
        <PersistGate persistor={persistor}>
      <AuthProvider>
      <Router>
      <Switch>
{/*-------------------------------------------------------------------------------------- */}
        <SimpleRoute path='/' exact comp={Home} />
   
{/*-------------------------------------------------------------------------------------- */}
        <SimpleRoute path='/signprofesor' comp={SignUpProf} />  
{/*-------------------------------------------------------------------------------------- */}
        <SimpleRoute path='/signelev' comp={SignUpElev} />  
{/*-------------------------------------------------------------------------------------- */}
        <SimpleRoute path='/studentlogin' comp={LoginStudent} />  
{/*-------------------------------------------------------------------------------------- */}
        <TeacherConnectedPrivateRoute path='/teachertimetable' comp={TeacherTimetable} /> 
{/*-------------------------------------------------------------------------------------- */}
        <StudentConnectedPrivateRoute path='/student-timetable' comp={TimetableStudent} />

{/*-------------------------------------------------------------------------------------- */}
        <TeacherConnectedPrivateRoute path='/classrooms/:id' comp = {Classroom}>
        </TeacherConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <StudentConnectedPrivateRoute path='/see-classrooms/:id' comp = {ClassroomStudent}>
        </StudentConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <TeacherConnectedPrivateRoute path='/profile' comp = {Profile}>
       
        </TeacherConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <StudentConnectedPrivateRoute path='/student-profile' comp = {ProfileStudent}>
               
        </StudentConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}

        <ConnectedPrivateRoute path= "/documents/:id"  comp = {TextEditor}>
        
        </ConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}


<TeacherConnectedPrivateRoute path= "/feedbackandbugs"  comp = {FeedbackAndBugs}>
        
        </TeacherConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
/*-------------------------------------------------------------------------------------- */}


<StudentConnectedPrivateRoute path= "/feedbackandbugsstudent"  comp = {FeedbackAndBugsStudent}>
        
        </StudentConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
<TeacherConnectedPrivateRoute path='/typeoftest' comp = {TypeOfTest}>
       
       </TeacherConnectedPrivateRoute>

{/*-------------------------------------------------------------------------------------- */}
        <SimpleRoute path='/login' comp = {Login}>
     
        </SimpleRoute> 
{/*-------------------------------------------------------------------------------------- */}
          <SimpleRoute path="/ask" comp={Ask} />

{/*-------------------------------------------------------------------------------------- */}
        <ConnectedPrivateRoute path='/update-profile' comp={UpdateProfile} />  
{/*-------------------------------------------------------------------------------------- */}
        <SimpleRoute path="/forgot-password" comp={Forgot}/>
{/*-------------------------------------------------------------------------------------- */}
        <TeacherConnectedPrivateRoute path='/classes' comp={Class}>
         
        </TeacherConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
        <StudentConnectedPrivateRoute path='/student-classes' comp = {ClassesStudent}>
     
        </StudentConnectedPrivateRoute>
{/*-------------------------------------------------------------------------------------- */}
      </Switch>
      </Router>
      </AuthProvider>
        </PersistGate>
    </Provider>
    </BrowserView>
    <MobileView>
            <Phone/>
    </MobileView>
    </>
  );
}

export default App;