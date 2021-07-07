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
import { Provider } from 'react-redux';
// import Class from './components/class';
import ClassRegister from './components/ClassRegister';
import FileUpload from './components/fileupload';
import TextEditor from './components/texteditor';
import {v4 as uuidV4} from 'uuid';
// import NoMatch from '../src/components/Meeting/NoMatch'
import TimeTable from '../src/components/TimeTable';
import Container from './components/Board/Container';
import Classroom from '../src/components/lessons/Classroom';
import Class from '../src/components/lessons/class';
import TeacherTimetable from './components/Timetables/TeacherTimetable';


import { useEffect } from 'react';

function App() {
 

  return (

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
          <PrivateRoute path='/classes' component={Class} />
        <PrivateRoute path='/inregistrareclasa' component={ClassRegister} />
        <Route path='/fileupload' component={FileUpload} />

        <Route path='/texteditor' component={TextEditor} />
       
        <Route exact path='/board/:id'>
          <Container/>
        </Route>
      
    <Route path ='/timetable' component = {TimeTable}/>   
    <Route path='/classes' component={Class} />
    <Route path='/board' component={Container}/>
       </Switch>
    
    </Router>
    </AuthProvider>
    
    
  );
}

export default App;
