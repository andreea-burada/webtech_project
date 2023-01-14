const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const { path } = require("path");
const { Student } = require("../models/student");
const { Team } = require("../models/team");
const { Team_Member } = require("../models/team_member");
const { Software_Project } = require("../models/software_project");
const { Bug } = require("../models/bug");


// /api/user
// returns session user; if no user was set, it returns null
const GetSessionUser = (req, res) => {
    // If you were using a DB, you would test for the user's id not their username probably
    if (req.session.user) {
        // If you were using a DB, you would use their user id to query the DB and send the entire user object to the front in this endpoint
        let user_json = {
            username: req.session.user.username
        }
        res.status(200).json(user_json);
   } else {
        res.status(404).send({message: "No user logged in"});
   }
}

// /api/team/all or /api/team/all?search="whatever"
const GetAllTeams = async (req, res) => {
    // get teams from DB
    let teams_array = [];
    let teams = null;

    // check if we have a search query
    if (req.query.search) {
        // get teams by search query
        let query = `%${req.query.search}%`;
        teams = await Team.findAll({
                where: {
                    name: { [Op.like]: query }
                }
            });
        
    } else {
        teams = await Team.findAll();
    }

    let username = 'zeceLaWeb';
    if (req.session.user) {
        username = req.session.user.username;
    }

    // get username gid
    let user_gid = await Student.findOne({
            attributes: [ 'gid' ],
            where: {
                username: username
            }
        });

    user_gid = user_gid.dataValues.gid;

    const unresolvedPromises = teams.map(async currentTeam => {
        // query to check if user is from team
        // SELECT is_admin FROM team_members AS tm, teams AS t WHERE t.id = tm.team_id AND tm.member_gid = [gid] AND tm.team_id=[id];
        let joined = 0;
        let currentTeam_json = currentTeam.dataValues;
        joined = await Team_Member.findOne({
            attributes: [ 'is_admin' ],
            include: {
                model: Team,
                required: true
            },
            where: {
                team_id: currentTeam_json.id,
                member_gid: user_gid
            }
        });
        if (joined) {
            if (joined.dataValues.is_admin == 1)
                currentTeam_json.joined = 2;
            else
                currentTeam_json.joined = 1;
        }
        else 
            currentTeam_json.joined = 0;

        teams_array.push(currentTeam_json);
    });

    // wait for the map to complete
    await Promise.all(unresolvedPromises);
    //console.log(teams_array);
    
    console.log(teams_array);
    return res.status(200).json(teams_array);
    //res.send(teams);
}

const GetOneTeam = async (req, res) => {
    // get id of team
    let id = req.params.id;
    let team_json = {};
    let projects_array = [];
    let members_array = [];

    // let team_members_array = [];
    // let team_member = await Team_Member.findAll();
    // team_member.map(currentMember => team_members_array.push(currentMember.dataValues));
    // console.log(team_members_array);
};

module.exports = {
    GetSessionUser, GetAllTeams
}