import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Team from './teamInfo.json'
// import './ViewTeams.css'
import '../App.css'
import './Teams.css'
axios.defaults.withCredentials = true;

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
      return <div className="loading">Loading... </div>
    }

    let button = null;
    if (currentTeam.joined == 0) {
      button = <button className="join-button" onClick={handleTeamJoin}>Join</button>
    } else if (currentTeam.joined == 1) {
      button = <button className="leave-button" onClick={handleTeamLeave}>Leave</button>
    } else if (currentTeam.joined == 2) {
      button = <button className="owned-button">OWNED</button>
    }

    return (
        <div className="team-container">
            <div className='team-details-container' key={currentTeam.id}>
                <h2 className="team-name"><strong>{currentTeam.name}</strong></h2>
                <h3 className="admin">Admin: {currentTeam.admin}</h3>
                <h3 className="slogan">{currentTeam.slogan}</h3>
                <h3 className='initials'>{currentTeam.initials}</h3>
                <div className="soft-proj-container">
                {currentTeam.projects.map((project) => {
                    return (<div className="project-container" key={project.id}>
                        <h3 className="project-name"><strong>{project.name}</strong></h3>
                        <h4 className="admin">{project.admin}</h4>
                        {(localStorage.username==project.admin) && 
                            <button>Owned</button>}
                        {!(localStorage.username==project.admin) && 
                            <button>View</button>}
                    </div>)
                    })
                }
                </div>
                <div className="members-container">
                {currentTeam.members.map((member)=>{
                    return(
                    <div className="member-container" >
                        <h3 className="member-username"><strong>Username: {member.username}</strong></h3>
                        <h4 className="member-email">{member.email}</h4>
                    </div>
                    )
                })}
                
                </div>
                {button}
            </div>
        </div>

    );
}

export default TeamInfo;