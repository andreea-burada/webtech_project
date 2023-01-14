import React from 'react'
import Navbar  from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home'
import FormSignIn from './components/FormLogin';
import FormSignUp from './components/FormSignup'
import ViewTeams from './components/ViewTeams';
import TeamInfo from './components/TeamInfo';


function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
         <Route path='/' exact component={Home} />
         <Route path='/sign-up' exact component={FormSignUp} />
         <Route path='/login' exact component={FormSignIn} />
         <Route path='/view-teams' exact component={ViewTeams}/>
         <Route path='/view-team/:id' exact component={TeamInfo}/>
      </Switch>
    </Router>
  );
}

export default App;
