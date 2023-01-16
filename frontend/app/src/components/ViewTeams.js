import React, { useState, useEffect } from 'react';
import {FaSearch} from 'react-icons/fa'
import axios from 'axios';
//import Teams from './teamInfoSummary.json';
// import './ViewTeams.css';
import '../App.css';
import './Teams.css';
import { Link } from 'react-router-dom';

var Teams = [];

function ViewTeam() {
  const [teams, setTeams] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // get team JSON from backend
    // path: /api/team/all
    try {
      axios.get("http://localhost:8080/api/team/all", { withCredentials: true })
        .then((response) => {
          console.log(response.data);
          Teams = response.data;
          setTeams(response.data);
          setLoading(false);
          //console.log(Teams);
        });
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  if (isLoading) {
    return <div className="loading">Loading... </div>
  }

  return (
    <div className="view-teams-container">
      <div className="search-bar-container">
        <input className="search-bar" placeholder='Search team name...'></input>
        <button className='search-button'><FaSearch/></button>
      </div>
      <div className="button-container"><Link to="/team/add"><button>Add Team</button></Link></div>
      {
        teams.map(team => {
          let button = null;
          if (team.joined == 0) {
            button = <button className="view-button">View</button>
          } else if (team.joined == 1) {
            button = <button className="joined-button">Joined</button>
          } else if (team.joined == 2) {
            button = <button className="owned-button">OWNED</button>
          }


          return (
            <div className='view-team-container' key={team.id}>
              <div className="initials">{team.initials}</div>
              <div className="details">
                <h2 className="team-name"><strong>{team.name}</strong></h2>
                <h3 className='team-admin'>Admin: {team.admin}</h3>
                <h3 className="no-members">No. of members: {team.noMembers}</h3>
              </div>
              <Link to={'/view-team/' + team.id}>
                {button}
              </Link>
            </div>
          )
        })
      }
    </div>
  );
}
export default ViewTeam;