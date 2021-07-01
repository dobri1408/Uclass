import React from 'react';
import './App.css';
import Home from './components/pages/HomePage/Home';
import Services from './components/pages/Services/Services';
import Products from './components/pages/Products/Products';
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
// import ScrollToTop from './components/ScrollToTop';
import SignUpProf from './components/SignUpProf';
import SignUpElev from './components/SignUpElev';
import { AuthProvider } from './components/contexts/AuthContext';
import Profile from './components/Profile';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Forgot from './components/Forgot';
import UpdateProfile from './components/UpdateProfile';
import OrarProf from './components/OrarProf';
import Zoom from './components/Zoom';
// import Class from './components/class';
import ClassRegister from './components/ClassRegister';
import FileUpload from './components/fileupload';
import TextEditor from './components/texteditor';
import {v4 as uuidV4} from 'uuid';
import CallPage from '../src/components/Meeting/CallPage';
import StartMeeting from '../src/components/Meeting/StartMeeting';
// import NoMatch from '../src/components/Meeting/NoMatch'
import CallPagev2 from './components/CallPage2';
import TimeTable from '../src/components/TimeTable';
// import Container from './components/tabla/Container';
import Classroom from '../src/components/lessons/Classroom';
import Class from '../src/components/lessons/class';
import TeacherTimetable from './components/Timetables/TeacherTimetable';



function App() {

  return (
      <React.StrictMode>
      <AuthProvider>
      <Router>
    
     <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/services' component={Services} />
        <PrivateRoute path='/products' component={Products} />
        <Route path='/signprofesor' component={SignUpProf} />  
        <Route path='/signelev' component={SignUpElev} />  
        <PrivateRoute path='/teachertimetable' component={TeacherTimetable}/>
        <Route 
            exact 
            path='/classrooms/:id'
            render={(props) => <Classroom {...props}/>} 
          />
        
        <PrivateRoute path='/profile' component={Profile} />  
        <Route path = "/" exact>
          <Redirect to ={`/documents/${uuidV4()}`}/>
        </Route>
        <PrivateRoute path= "/documents/:id" >
      <TextEditor/>
      </PrivateRoute>
        <Route path='/login' component={Login} />  
        <PrivateRoute path='/update-profile' component={UpdateProfile} />  
        <Route path="/forgot-password" component={Forgot}/>
        <PrivateRoute path='/meet' component={Zoom} />  
         <PrivateRoute path='/inregistrareclasa' component={ClassRegister} />
        <Route path='/fileupload' component={FileUpload} />
        <Route path='/texteditor' component={TextEditor} />
        <Route path='/meetingui' component={CallPagev2}/>
             <Route exact path='/meeting/:id'>
          <CallPage />

        </Route>
        {/* <Route exact path='/board/:id'>
          <Container/>
        </Route> */}
        <Route path = '/startmeeting'>
          <StartMeeting/>
        </Route>
    <Route path ='/timetable' component = {TimeTable}/>   
    <Route path='/classes' component={Class} />
    {/* <Route path='/board' component={Container}/> */}
       </Switch>
    
    </Router>
    </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
