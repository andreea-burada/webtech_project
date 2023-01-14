import React from 'react'
import Navbar  from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home'
import FormSignIn from './components/FormLogin';
import FormSignUp from './components/FormSignup';
import ViewBugs from './components/ViewBugs';
import AddBug from './components/AddBug';
import AddProject from './components/AddProject';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
         <Route path='/' exact component={Home} />
         <Route path='/sign-up' exact component={FormSignUp} />
         <Route path='/login' exact component={FormSignIn} />
         <Route path='/viewBugs' exact component={ViewBugs}/>
         <Route path='/addBug' exact component={AddBug}/>
         <Route path='/addProject' exact component={AddProject}/>
      </Switch>
    </Router>
    
    
  );
}

export default App;
