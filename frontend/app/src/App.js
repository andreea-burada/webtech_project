import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import FormSignIn from "./components/FormLogin";
import FormSignUp from "./components/FormSignup";
import ViewTeams from "./components/ViewTeams";
import TeamInfo from "./components/TeamInfo";
import ProjectInfo from "./components/ProjectInfo";
import AddTeam from "./components/AddTeam";
import ViewBugs from './components/ViewBugs';
import AddBug from './components/AddBug';
import AddProject from './components/AddProject';
import EditBug from './components/EditBug';
import BugInfo from "./components/BugInfo";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // sync username with backend
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // get team JSON from backend
    // path: /api/team/all

    axios
      .get("http://localhost:8080/api/user", { withCredentials: true })
      .then((response) => {
        //console.log(response);
        if (response.status == 200) {
          localStorage.setItem("username", response.data.username);
          setLoading(false);
        }
      })
      .catch((error) => {
        localStorage.removeItem("username");
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign-up" exact component={FormSignUp} />
          <Route path="/login" exact component={FormSignIn} />
          <Route path="/view-teams" exact component={ViewTeams} />
          <Route path="/view-team/:id" exact component={TeamInfo} />
          <Route path="/team/:team_id/project/:id" exact component={ProjectInfo} />
          <Route path="/team/add" exact component={AddTeam}/>
          <Route path='/bug/all' exact component={ViewBugs}/>
          <Route path='/project/:project_id/bug/add' exact component={AddBug}/>
          <Route path='/team/:team_id/add' exact component={AddProject}/>
          <Route path='/project/:project_id/bug/:id' exact component={EditBug}/>  
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign-up" exact component={FormSignUp} />
        <Route path="/login" exact component={FormSignIn} />
        <Route path="/view-teams" exact component={ViewTeams} />
        <Route path="/view-team/:id" exact component={TeamInfo} />
        <Route path="/team/:team_id/project/:id" exact component={ProjectInfo} />
        <Route path="/team/add" exact component={AddTeam}/>
        <Route path='/bug/all' exact component={ViewBugs}/>
        <Route path='/project/:project_id/bug/add' exact component={AddBug}/>
        <Route path='/team/:team_id/add' exact component={AddProject}/>
        <Route path='/project/:project_id/bug/:id' exact component={EditBug}/>
      </Switch>
    </Router>
  );
}

export default App;
