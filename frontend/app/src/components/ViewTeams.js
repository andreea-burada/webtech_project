import React from 'react';
import axios from 'axios';
import Teams from './teamInfoSummary.json';
// import './ViewTeams.css';
import '../App.css';
import './Teams.css';
import { Link } from 'react-router-dom';

// axios post
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

function ViewTeam() {
  return (
    <div className="view-teams-container">
      <div className="button-container"><button>Add Team</button></div>
      {
        Teams.map(team => {
          return (
            <div className='view-team-container' key={team.id}>
              <div className="initials">{team.initials}</div>
              <div className="details">
                <h2 className="team-name"><strong>{team.name}</strong></h2>
                <h3 className='team-admin'>Admin: {team.admin}</h3>
                <h3 className="no-members">No. of members: {team.noMembers}</h3>
              </div>
              <Link to={'/view-team/' + team.id}>
                {!checkTeam(localStorage.username, team.id) &&
                  <button className="view-button">View</button>}
                {checkTeam(localStorage.username, team.id) &&
                  <button className="joined-button">Joined</button>}
              </Link>
            </div>
          )
        })
      }
    </div>
  );
}
export default ViewTeam;