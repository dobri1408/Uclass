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
import Class from './components/lessons/class';
import ClassRegister from './components/ClassRegister';
import FileUpload from './components/fileupload';
import TextEditor from './components/texteditor';
import {v4 as uuidV4} from 'uuid';
import CallPage from '../src/components/Meeting/CallPage';
import StartMeeting from '../src/components/Meeting/StartMeeting';
// import NoMatch from '../src/components/Meeting/NoMatch'
import CallPagev2 from './components/CallPage2';
import TimeTable from '../src/components/TimeTable';
function App() {

  return (
    <React.StrictMode>
    <AuthProvider>
  <Router>
    
     <Switch>
      <div style={{backgroundColor: '#024873'}}>
        <Route path='/' exact component={Home} />
        <Route path='/services' component={Services} />
        <Route path='/products' component={Products} />
        <Route path='/signprofesor' component={SignUpProf} />  
        <Route path='/signelev' component={SignUpElev} />  
        <PrivateRoute path='/profile' component={Profile} />  
        <Route path = "/documents" exact>
          <Redirect to ={`/documents/${uuidV4()}`}/>
        </Route>
        <PrivateRoute path= "/documents/:id" >
        <TextEditor/>
        </PrivateRoute>
        <Route path='/login' component={Login} />  
        <PrivateRoute path='/update-profile' component={UpdateProfile} />  
        <Route path="/forgot-password" component={Forgot}/>
        <PrivateRoute path='/orarprof' component={OrarProf} />  
        <PrivateRoute path='/meet' component={Zoom} />  
        <PrivateRoute path='/classes' component={Class} />
        <PrivateRoute path='/inregistrareclasa' component={ClassRegister} />
        <Route path='/fileupload' component={FileUpload} />
        <Route path='/texteditor' component={TextEditor} />
        <Route path='/meetingui' component={CallPagev2}/>
             <Route exact path='/meeting/:id'>
          <CallPage />

        </Route>
        <Route path = '/startmeeting'>
          <StartMeeting/>
        </Route>
        <Route path ='/timetable' component = {TimeTable}/>   
      </div>

       </Switch>
    
    </Router>
    </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
