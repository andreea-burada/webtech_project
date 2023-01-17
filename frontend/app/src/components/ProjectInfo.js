import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import './ViewTeams.css'
import "../App.css";
import "./ProjectInfo.css";
axios.defaults.withCredentials = true;

var currentProject = {};

const ProjectInfo = () => {
  // get params from URL
  let url = window.location.href.split('/', 10);
  var id = url[6];
  var team_id = url[4];
  
  

  const [project, setProject] = useState({});
  const [isLoading, setLoading] = useState(true);

  // const handleTeamJoin = () => {
  //   axios.patch("http://localhost:8080/api/team/" + currentTeam.id, { withCredentials: true })
  //     .then((response) => {
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log("error", error.response.data);
  //     });
  // };

  // const handleTeamLeave = () => {
  //   axios.delete("http://localhost:8080/api/team/" + currentTeam.id, { withCredentials: true })
  //     .then((response) => {
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8080/api/team/" + team_id + "/project/" + id, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          currentProject = response.data;
          setProject(response.data);
          setLoading(false);
          //console.log(Teams);
        });
    } catch (error) {
      console.log("error", error.response.data);
    }
  }, []);

  if (isLoading) {
    return <div className="loading">Loading... </div>;
  }

  let assignButton = null;
  if (currentProject.can_assign == false) {
    assignButton = (
      <button className="assign-button disabled">Assign (disabled)</button>
    );
  } else {
    assignButton = <button className="assign-button">Assign</button>;
  }

  let reportButton = null;
  if (currentProject.can_report == false) {
    reportButton = <button className="add-bug-button disabled">Add Bug (disabled)</button>;
  } else {
    reportButton = <button className="add-bug-button">Add Bug</button>;
  }

  return (
    <div className="project-container">
      <div className="project-details-container" key={currentProject.id}>
        <h2 className="project-name">
          <strong>{currentProject.name}</strong>
        </h2>
        <h3 className="owner">Owner: {currentProject.owner}</h3>
        <h3 className="repo_link">Repo: {currentProject.repo_link}</h3>
        <h3 className="description">Description: {currentProject.description}</h3>
        <div className="bugs-container">
          {currentProject.bugs.map((bug) => {
            return (
              <div className="bug-container" key={bug.id}>
                <h3 className="bug-name">
                  <strong>Name: {bug.name}</strong>
                </h3>
                <h4 className="reporter">Reporter: {bug.reporter}</h4>
                <h4 className="fixer">Fixer: {bug.fixer}</h4>
                <h5 className="state">State: {bug.state}</h5>
                <h3 className="severity">Severity: {bug.severity}</h3>
                <div className="assign-button-container">{assignButton}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="add-bug-container">
        {reportButton}
      </div>
    </div>
  );
}

export default ProjectInfo;
