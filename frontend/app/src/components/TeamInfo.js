import React from 'react'
import axios from 'axios'
import Team from './teamInfo.json'
// import './ViewTeams.css'
import '../App.css'
import './Teams.css'

function TeamInfo() {
    let dump = window.location.href.split('/');
    var id = dump[dump.length - 1];

    // TODO: call backend to get json of team based on ID

    var currentTeam = Team.filter((element) => {
        return element.id == id;
    })[0];
    console.log(currentTeam);

    //axios call
    async function checkTeam(username, team_id) {
        let payload_json = {
          username: username,
          team_id: team_id
        }
        // axios call
        try {
          await axios.post("http://localhost:8080/api/team/checkUser", payload_json, { withCredentials: true })
            .then((response) => {
              //console.log(response);
              if (response.status == 200) {
                let joined = response.data.joined;
              }
            });
        }
        catch (error) {
          console.log(error.response.data);
        }
      
        //return joined;
        return false;
      }

    return (
        <div className="team-container">
            <div className='team-details-container' key={currentTeam.id}>
                <h2 className="team-name"><strong>{currentTeam.teamName}</strong></h2>
                <h3 className="slogan">{currentTeam.slogan}</h3>
                <h3 className='initials'>{currentTeam.initials}</h3>
                <div className="soft-proj-container">
                {currentTeam.projects.map((project) => {
                    return (<div className="project-container" key={project.id}>
                        <h3 className="project-name"><strong>{project.projectName}</strong></h3>
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
                    <div className="member-container" key={member.id}>
                        <h3 className="member-username"><strong>Username: {member.username}</strong></h3>
                        <h4 className="member-email">{member.email}</h4>
                    </div>
                    )
                })}
                
                </div>
                {!checkTeam(localStorage.username, currentTeam.id) && 
                            <button>Join</button>}
                {checkTeam(localStorage.username, currentTeam.id) && 
                            <button>Leave</button>}
            </div>
        </div>

    );
}

export default TeamInfo;