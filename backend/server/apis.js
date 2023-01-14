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
                },
                order: [[ 'id', 'ASC' ]]
            });
        
    } else {
        teams = await Team.findAll({
            order: [[ 'id', 'ASC' ]]
        });
    }
    console.log(teams.dataValues);

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

    let unresolvedPromises = teams.map(async currentTeam => {
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

        // query to get number of team members
        let noMembers = 0;
        noMembers = await Team_Member.count({
            where: {
                team_id: currentTeam_json.id
            }
        });
        currentTeam_json.noMembers = noMembers;

        // query to get admin of team
        let admin = '';
        admin = await Student.findOne({
            include: {
                model: Team_Member,
                required: true,
                where: {
                    id: currentTeam_json.id
                }
            },
            attributes: [ 'username' ]
        });
        currentTeam_json.admin = admin.dataValues.username;

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

    // get team information
    let team_json = {};
    team_json = await Team.findOne({
        where: {
            id: id
        }
    });
    team_json = team_json.dataValues;
    

    // get team admin
    let admin = '';
    admin = await Student.findOne({
        include: {
            model: Team_Member,
            required: true,
            where: {
                team_id: id,
                is_admin: 1
            }
        },
        attributes: [ 'username' ]
    });
    team_json.admin = admin.dataValues.username;


    let username = 'zeceLaWeb';
    if (req.session.user) {
        username = req.session.user.username;
    }
    console.log("username", username);
    // get username gid
    let user_gid = await Student.findOne({
        attributes: [ 'gid' ],
        where: {
            username: username
        }
    });

    user_gid = user_gid.dataValues.gid;

    // check if user is part of the team or not or is the owner
    // 0 - not joined, 1 - joined, 2 - owner
    let joined = 0;
    joined = await Team_Member.findOne({
        attributes: [ 'is_admin' ],
        where: {
            team_id: team_json.id,
            member_gid: user_gid
        }
    });
    if (joined) {
        if (joined.dataValues.is_admin == 1)
            team_json.joined = 2;
        else
            team_json.joined = 1;
    }
    else 
        team_json.joined = 0;

    // get team software projects
    let projects_array = [];
    let projects = await Software_Project.findAll({
        include: {
            model: Team_Member,
            required: true,
            where: {
                team_id: id
            }
        }
    });

    let unresolvedPromises = projects.map(async (currentProject) => {
        // get admin gid
        let admin_gid = await Team_Member.findOne({
            attributes: [ 'member_gid' ],
            where: {
                id: currentProject.owner_id
            }
        });
        admin_gid = admin_gid.member_gid;

        let admin_username = await Student.findOne({
            attributes: [ 'username' ],
            where: {
                gid: admin_gid
            }
        });
        admin_username = admin_username.dataValues.username;

        projects_array.push({
            id: currentProject.id,
            name: currentProject.name,
            repo_link: currentProject.repo_link,
            owner: admin_username
        })
    })

    // wait for the map to complete
    await Promise.all(unresolvedPromises);
    team_json.projects = projects_array;

    // get team members
    let members_array = [];
    let members = await Team_Member.findAll({
        where: {
            team_id: id
        }
    });

    unresolvedPromises = members.map(async (currentMember) => {
        // get member information
        let member_info = await Student.findOne({
            where: {
                gid: currentMember.member_gid
            }
        });
        member_info = member_info.dataValues;

        members_array.push({
            username: member_info.username,
            email: member_info.email
        })
    })

    // wait for the map to complete
    await Promise.all(unresolvedPromises);
    team_json.members = members_array;

    console.log(team_json);
    return res.status(200).json(team_json);
};

module.exports = {
    GetSessionUser, GetAllTeams, GetOneTeam
}