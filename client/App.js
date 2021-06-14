import React from 'react';
import './App.css';
import Home from './components/pages/HomePage/Home';
import Services from './components/pages/Services/Services';
import Products from './components/pages/Products/Products';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
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
import Class from './components/class';
import ClassRegister from './components/ClassRegister';
import FileUpload from './components/fileupload';

function App() {

  return (
    <AuthProvider>
  <Router>
      <ScrollToTop/>
     <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/services' component={Services} />
        <Route path='/products' component={Products} />
        <Route path='/signprofesor' component={SignUpProf} />  
        <Route path='/signelev' component={SignUpElev} />  
        <PrivateRoute path='/profile' component={Profile} />  
        <Route path='/login' component={Login} />  
        <PrivateRoute path='/update-profile' component={UpdateProfile} />  
        <Route path="/forgot-password" component={Forgot}/>
         <PrivateRoute path='/orarprof' component={OrarProf} />  
        <PrivateRoute path='/meet' component={Zoom} />  
        <PrivateRoute path='/classes' component={Class} />
        <PrivateRoute path='/inregistrareclasa' component={ClassRegister} />
        <PrivateRoute path='/fileupload' component={FileUpload} />
       </Switch>
    
    </Router>
    </AuthProvider>
  );
}

export default App;
