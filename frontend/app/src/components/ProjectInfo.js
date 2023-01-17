import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "./ProjectInfo.css";
axios.defaults.withCredentials = true;

var currentProject = {};

const ProjectInfo = () => {
  // get params from URL
  let url = window.location.href.split('/', 10);
  var id = url[6];
  var team_id = url[4];
  let bug_id = 0;

  const [project, setProject] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isAssigning, setAssigning] = useState(false);
  const [isUnassigning, setUnassigning] = useState(false);

  const handleAssign = (event) => {
    setAssigning(true);
    bug_id = event.target.parentNode.id;
  }

  useEffect(() => {
    // make call to assign current logged in user as fixer
    if (isAssigning == true) {
      try {
        axios
          .post("http://localhost:8080/api/" + currentProject.id +  "/bug/" + id + "/assign", {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data);
            setAssigning(false);
            window.location.reload();
          });
      } catch (error) {
        console.log("error", error.response.data);
      }
    }
    else {
      console.log("no");
    }
  }, [isAssigning]);

  const handleUnassign = (event) => {
    setUnassigning(true);
    bug_id = event.target.parentNode.id;
  }

  useEffect(() => {
    // make call to remove any fixer that is currently assigned
    if (isUnassigning == true) {
      try {
        axios
          .delete("http://localhost:8080/api/" + currentProject.id +  "/bug/" + id + "/assign", {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data);
            setUnassigning(false);
            window.location.reload();
          });
      } catch (error) {
        console.log("error", error.response.data);
      }
    }
    else {
      console.log("no");
    }
  }, [isUnassigning]);

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
      <><button className="assign-button disabled">Assign (disabled)</button><button className="unassign-button disabled">Unassign (disabled)</button></>
    );
  } else {
    assignButton = ( 
    <><button className="assign-button" onClick={handleAssign}>Assign</button><button className="unassign-button" onClick={handleUnassign}>Unassign</button></>
    );
  }

  let reportButton = null;
  if (currentProject.can_report == false) {
    
    reportButton = <button className="add-bug-button disabled">Add Bug (disabled)</button>
  } else {
    let url = "/project/" + currentProject.id + "/bug/add";
    reportButton = (
    <><Link to={url}><button className="add-bug-button">Add Bug</button></Link></>
    );
  }

  return (
    <div className="project-container">
      <div className="project-details-container" key={currentProject.id}>
        <h2 className="project-name">
          <strong>{currentProject.name}</strong>
        </h2>
        <h3 className="owner">Owner: {currentProject.owner}</h3>
        <h3 className="repo_link">{currentProject.repo_link}</h3>
        <h3 className="description">{currentProject.description}</h3>
        <div className="bugs-container">
          {currentProject.bugs.map((bug) => {
            let where = "/project/" + currentProject.id + "/bug/" + bug.id;
            return (
              <div className="bug-container" key={bug.id}>
                <Link to={where}>
                <h3 className="bug-name">
                  <strong>{bug.name}</strong>
                </h3>
                </Link>
                <h4 className="reporter">Reporter: {bug.reporter}</h4>
                <h4 className="fixer">Solver: {bug.solver}</h4>
                <h5 className="state">{bug.state}</h5>
                <h3 className="severity">{bug.severity}</h3>
                <div className="assign-button-container" id={bug.id}>{assignButton}</div>
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
