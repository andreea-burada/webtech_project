import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'
import './TeamInfo.css'

var currentTeam = {};

function TeamInfo() {
  let dump = window.location.href.split('/');
  var id = dump[dump.length - 1];

  // TODO: call backend to get json of team based on ID
  // path: /api/team/:id
  const [team, setTeam] = useState({});
  const [isLoading, setLoading] = useState(true);

  const handleTeamJoin = () => {
    axios.patch("http://localhost:8080/api/team/" + currentTeam.id, { withCredentials: true })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", error.response.data);
      });
  };

  const handleTeamLeave = () => {
    axios.delete("http://localhost:8080/api/team/" + currentTeam.id, { withCredentials: true })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    try {
      axios.get("http://localhost:8080/api/team/" + id, { withCredentials: true })
        .then((response) => {
          console.log(response.data);
          currentTeam = response.data;
          setTeam(response.data);
          setLoading(false);
          //console.log(Teams);
        });
    } catch (error) {
      console.log("error", error.response.data);
    }
  }, []);

  if (isLoading) {
    return <div className='loading'>Loading...</div>
  }

    let button = null;
    let buttonAddProject = null;
    if (currentTeam.joined == 0) {
      button = <button className="join-button" onClick={handleTeamJoin}>Join</button>
    } else if (currentTeam.joined == 1) {
      button = <button className="leave-button" onClick={handleTeamLeave}>Leave</button>
      let where = "/team/" + currentTeam.id + "/add";
      buttonAddProject = (
        <><div className="add-project-container"><Link to={where}><button className="add-project">Add Project</button></Link></div></>
      );
    } else if (currentTeam.joined == 2) {
      button = <button className="owned-button">OWNED</button>
      let where = "/team/" + currentTeam.id + "/add";
      buttonAddProject = (
        <><div className="add-project-container"><Link to={where}><button className="add-project">Add Project</button></Link></div></>
      );
    }

    return (
      <div className="team-container">
        <div className='team-details-container' key={currentTeam.id}>
          <div className='team-details'>
            <h2 className="team-name"><strong>{currentTeam.name}</strong></h2>
            <h3 className="admin">Admin:{currentTeam.admin}</h3>
            <h3 className="slogan">{currentTeam.slogan}</h3>
            <h3 className='initials'>{currentTeam.initials}</h3>
          </div>
          <div className="soft-proj-container">
            <p className="soft-title">Software Projects</p>
            {currentTeam.projects.map((project) => {
              return (<div className="project-container" key={project.id}>
                <h3 className="project-name"><strong>{project.name}</strong></h3>
                <h4 className="admin">{project.owner}</h4>
                <a href={"/team/" + currentTeam.id + "/project/" + project.id}>
                  {(localStorage.username == project.owner) &&
                    <button className='owned-button'>Owned</button>}
                  {!(localStorage.username == project.owner) &&
                    <button class="view-button">View</button>}
                </a>
              </div>)
            })
            }
          </div>
          <div className="members-container">
          <p className="members-title">Members</p>
            {currentTeam.members.map((member) => {
              return (
                <div className="member-container" >
                  <h3 className="member-username"><strong>Username: {member.username}</strong></h3>
                  <h4 className="member-email">{member.email}</h4>
                </div>
              )
            })}
            
          </div>
          {button}
        </div>
        <div className="join-leave-container">
          {buttonAddProject}
        </div>
      </div>
  
    );
}

export default TeamInfo;