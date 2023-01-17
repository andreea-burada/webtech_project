const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const { path } = require("path");
const { Student } = require("../models/student");
const { Team } = require("../models/team");
const { Team_Member } = require("../models/team_member");
const { Software_Project } = require("../models/software_project");
const { Bug } = require("../models/bug");
const { sequelize } = require('../models/db');


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
        query = query.toLowerCase();
        // Sequelize.where(Sequelize.fn('lower', Sequelize.col('TITLE')), Sequelize.fn('lower', title))
        // teams = await Team.findAll({
        //         where: {
        //             name: { [Op.like]: query }
        //         },
        //         order: [[ 'id', 'ASC' ]]
        //     });
        teams = await Team.findAll({
                where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), { [Op.like]: query }),
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
                    team_id: currentTeam_json.id,
                    is_admin: 1
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

// /api/team/:id
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

// /api/team/add - POST
const AddOneTeam = async (req, res) => {
    // get form
    let form = req.body;
    let new_team_json = {
        name: form.name,
        slogan: form.slogan,
        initials: form.initials
    };
    let new_team = new Team(new_team_json);
    try {
        // check if team with name exists in DB
        if (await Team.findOne({where:{name:String(new_team_json.name)}}) != null) {
            console.log(`Team with initials ${new_team_json.name} exists`);
            res.status(201).json({error: `Team with name ${new_team_json.name} exists`});
        } 
        // check if team with initials exists in DB 
        else if (await Team.findOne({where:{initials:String(new_team_json.initials)}}) != null) {
            console.log(`Team with initials ${new_team_json.initials} exists`);
            res.status(201).json({error: `Team with initials ${new_team_json.initials} exists`});
        }
        else {
            // add team in table
            await new_team.save();

            // add team admin in the team_members table entry
            // get team id
            let team_id = await Team.findOne({
                attributes: [ 'id' ],
                where: {
                    name: new_team_json.name
                }
            });
            team_id = team_id.dataValues.id;

            // get current username gid
            let username = "zeceLaWeb";
            if (req.session.user) {
                username = req.session.user.username;
            }
            let username_gid  = await Student.findOne({
                attributes: [ 'gid' ],
                where: {
                    username: username
                }
            });
            username_gid = username_gid.dataValues.gid;

            let team_admin_json = {
                member_gid: username_gid,
                team_id: team_id,
                is_admin: 1,
                tester: 0
            };

            let team_admin = new Team_Member(team_admin_json);
            await team_admin.save();

            console.log("New team added.");
            res.status(200).json({message: "OK"});
        }
        
    }
    catch (error) {
        res.status(201).json({error: 'Team could not be added'});
        console.log(error);
    }
};

// api/team/:id - PATCH
const TeamJoin = async (req, res) => {
    // get id of team
    let team_id = parseInt(req.params.id);
    // get gid of current user
    let username = "zeceLaWeb";
    if (req.session.user) {
        username = req.session.user.username;
    }
    let username_gid  = await Student.findOne({
        attributes: [ 'gid' ],
        where: {
            username: username
        }
    });
    username_gid = username_gid.dataValues.gid;

    // check if member already is part of the team - shouldn't be neccesary but just in case
    let is_member = await Team_Member.findOne({
        attributes: [ 'id' ],
        where: {
            team_id: team_id,
            member_gid: username_gid
        }
    });

    // check if member has bugs for any project belonging to the team
    let projects_of_team = await Software_Project.findAll({
        include: {
            model: Team_Member,
            where: {
                team_id: team_id
            }
        },
        attributes: [ 'id' ]
    });

    let project_ids = [];
    projects_of_team.map((currentProject) => {
        project_ids.push(currentProject.dataValues.id);
    });

    let bugs = await Bug.findAll({
        include: {
            model: Software_Project,
            required: true,
            where: {
                id: { [Op.in]: project_ids }
            }
        },
        where: {
            reporter_gid: username_gid
        },
        attributes: [ 'id' ]
    });

    if (is_member == null && bugs.length == 0) {
        let team_member_json = {
            member_gid: username_gid,
            team_id, team_id,
            is_admin: 0,
            tester: 0
        };
        let team_member = new Team_Member(team_member_json);
        await team_member.save();

        return res.sendStatus(200);
    } else if (is_member != null) {
        return res.sendStatus(201);
    }
    else if (bugs.length > 0) {
        return res.status(403).json({message: `User "${username}" is a tester (has reported at least 1 bug) for this team and cannot join.`});
    }
};

// api/team/:id - DELETE
const TeamLeave = async (req, res) => {
    // get id of team
    let team_id = parseInt(req.params.id);
    // get gid of current user
    let username = "zeceLaWeb";
    if (req.session.user) {
        username = req.session.user.username;
    }
    let username_gid  = await Student.findOne({
        attributes: [ 'gid' ],
        where: {
            username: username
        }
    });
    username_gid = username_gid.dataValues.gid;

    // check if member already is part of the team - shouldn't be neccesary but just in case
    let team_member_info = await Team_Member.findOne({
        where: {
            team_id: team_id,
            member_gid: username_gid
        }
    });
    if (team_member_info != null) {
        team_member_info = team_member_info.dataValues;
        // if user is admin then not allowed to leave
        if (team_member_info.is_admin == 0) {
            await Team_Member.destroy({
                where: {
                    id: team_member_info.id
                }
            });
            return res.sendStatus(200);
        } else {
            return res.sendStatus(403);
        }
    } else {
        return res.status(203).json({message: `User ${username} was not part of the team.`});
    }
};

// /api/team/:team_id/project/add - POST
const AddOneProject = async (req, res) => {
    
    // get the team id
    let team_id = req.params.team_id;

    // get current user gid
    let username = "zeceLaWeb";
    if (req.session.user) {
        username = req.session.user.username;
    }
    let username_gid  = await Student.findOne({
        attributes: [ 'gid' ],
        where: {
            username: username
        }
    });
    username_gid = username_gid.dataValues.gid;

    // get current user entry in the team_members table using the gid and team_id
    let team_member_info = await Team_Member.findOne({
        where: {
            team_id: team_id,
            member_gid: username_gid
        }
    });
    team_member_info = team_member_info.dataValues;

    // get form
    let form = req.body;
    // create json containing information of software project to be added
    let new_project_json = {
        name: form.name,
        description: form.description,
        repo_link: form.repo_link,
        owner_id: team_member_info.id
    };
    let new_project = new Software_Project(new_project_json);
    new_project.save();

    res.sendStatus(200);
};

// /api/team/:team_id/project/:id - GET
const GetOneProject = async (req, res) => {
    // get parameters of URL
    let team_id = parseInt(req.params.team_id);
    let project_id = parseInt(req.params.id);

    let project_json = {};
    // get general information of project
    let project_info = await Software_Project.findOne({
        where: {
            id: project_id
        }
    });
    project_info = project_info.dataValues;

    // get admin gid
    let admin_gid = await Team_Member.findOne({
        attributes: [ 'member_gid' ],
        where: {
            id: project_info.owner_id
        }
    });
    admin_gid = admin_gid.member_gid;

    // get admin username
    let admin_username = await Student.findOne({
        attributes: [ 'username' ],
        where: {
            gid: admin_gid
        }
    });
    admin_username = admin_username.dataValues.username;

    project_json = {
        id: project_info.id,
        team_id: team_id,
        name: project_info.name,
        repo_link: project_info.repo_link,
        description: project_info.description,
        owner: admin_username
    };
    
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

    // check if user can assign bugs to themselves to solve
    // -> part of the team
    let can_assign = false;
    can_assign = await Team_Member.findOne({
        attributes: [ 'is_admin' ],
        include: {
            model: Team,
            required: true
        },
        where: {
            team_id: team_id,
            member_gid: user_gid
        }
    });
    if (can_assign) {
        can_assign = true;
    } else {
        can_assign = false;
    };

    // check if user can add bugs
    // -> NOT part of the team
    let can_report = false;
    if (can_assign == true) {
        can_report = false;
    } else {
        can_report = true;
    }

    project_json.can_assign = can_assign;
    project_json.can_report = can_report;

    // get bug list for project
    let bugs_array = [];
    let bugs = await Bug.findAll({
        where: {
            software_project_id: project_id
        }
    });
    const unresolvedPromises = bugs.map(async (currentBug) => {
        let bug_info = currentBug.dataValues;
        let bug_json = {};

        // get reporter username
        let reporter_username = await Student.findOne({
            attributes: [ 'username' ],
            where: {
                gid: bug_info.reporter_gid
            }
        });
        reporter_username = reporter_username.dataValues.username;

        // get solver username if it exists
        let solver_username = '';
        if (bug_info.fixer_gid) {
            solver_username = await Student.findOne({
                attributes: [ 'username' ],
                where: {
                    gid: bug_info.fixer_gid
                }
            });
            solver_username = solver_username.dataValues.username;
        }

        // decodify severity
        let severity = '';
        if (bug_info.severity == 0) {
            severity = 'SEVERE';
        } else if (bug_info.severity == 1) {
            severity = 'SERIOUS';
        } else if (bug_info.severity == 2) {
            severity = 'MINOR';
        }

        bug_json = {
            id: bug_info.id,
            name: bug_info.name,
            severity: severity,
            state: bug_info.status,
            reporter: reporter_username,
            solver: solver_username
        }

        bugs_array.push(bug_json);
    });

    // wait for the map to complete
    await Promise.all(unresolvedPromises);

    project_json.bugs = bugs_array;

    res.status(200).json(project_json)
};

// /api/:project_id/bug/add - POST
const AddOneBug = async(req, res) => {
    // get project id
    let project_id = req.params.project_id;
    // get form
    let form = req.body;
    // get reporter GID
    let username = "zeceLaWeb";
    if (req.session.user) {
        username = req.session.user.username;
    }
    // get GID from username
    let reporter_gid = await Student.findOne({
        where: {
            username: username
        },
        attributes: [ 'gid' ]
    });
    reporter_gid = reporter_gid.dataValues.gid;
    // codify severity
    let severity = 0;
    if (form.severity == "SERIOUS") {
        severity = 1;
    } else if (form.severity == "MINOR") {
        severity = 2;
    }
    // link
    // verify if the link is a valid url
    try {
        let dummy = new URL(form.link);
        // <- if here, link is good
        let status = "NOT SOLVED";
        let bug_json = {
            software_project_id: project_id,
            name: form.name,
            severity: severity,
            reporter_gid: reporter_gid,
            link: form.link,
            description: form.description,
            status: status,
            fixer_gid: null,
            solution_link: null
        }
        let bug = new Bug(bug_json);
        bug.save();
        return res.sendStatus(200);

    } catch (error) {
        return res.status(404).json({error: "URL provided for Bug link is not a valid URL."});
    }

};

// /api/:project_id/bug/:id - GET
const GetOneBug = async (req, res) => {
    // get project_id
    let project_id = req.params.project_id;
    // get bug id
    let id = req.params.id;

    let bug_json = {};
    // get info
    let bug_info = await Bug.findOne({
        where: {
            id: id
        }
    });
    bug_info = bug_info.dataValues;

    // get requester GID
    let username = "zeceLaWeb";
    if (req.session.user) {
        username = req.session.user.username;
    }
    // get GID from username
    let requester_gid = await Student.findOne({
        where: {
            username: username
        },
        attributes: [ 'gid' ]
    });
    requester_gid = requester_gid.dataValues.gid;

    // get project information
    let project_info = await Software_Project.findOne({
        where: {
            id: project_id
        }
    });
    project_info = project_info.dataValues;

    // get team id of project where the bug belongs to
    let team_id = await Team_Member.findOne({
        where: {
            id: project_info.owner_id
        },
        attributes: [ 'team_id' ]
    });
    team_id = team_id.dataValues.team_id;

    // check if user is tester or not
    let tester = true;
    tester = await Team_Member.findOne({
        attributes: [ 'is_admin' ],
        include: {
            model: Team,
            required: true
        },
        where: {
            team_id: team_id,
            member_gid: requester_gid
        }
    });
    if (tester) {
        tester = false;
    } else {
        tester = true;
    };

    // get reporter username
    let reporter_username = await Student.findOne({
        where: {
            gid: bug_info.reporter_gid
        },
        attributes: [ 'username' ]
    });
    reporter_username = reporter_username.dataValues.username;

    // get fixer username if fixer exists
    let fixer_username = await Student.findOne({
        where: {
            gid: bug_info.fixer_gid
        },
        attributes: [ 'username' ]
    });
    if (fixer_username) {
        fixer_username = fixer_username.dataValues.username;
    } else {
        fixer_username = '';
    }

    let severity = '';
    if (bug_info.severity == 0) {
        severity = 'SEVERE';
    } else if (bug_info.severity == 1) {
        severity = 'SERIOUS';
    } else if (bug_info.severity == 2) {
        severity = 'MINOR';
    }

    bug_json = {
        id: id,
        project_id: project_id,
        team_id: team_id,
        name: bug_info.name,
        description: bug_info.description,
        link: bug_info.link,
        reporter: reporter_username,
        tester: tester,
        severity: severity,
        state: bug_info.status,
        solution_link: bug_info.solution_link,
        solver: fixer_username
    };

    return res.status(200).json(bug_json);
};

// /api/:project_id/bug/:id - PATCH
// it treats two different cases
// if USER is tester -> {name, description, link, severity} will be modified
// if USER is member of team of project -> {description, status, solution_link}
//              if solution_link is modified we assume that the user who sends the PATCH request 
const EditOneBug = async (req, res) => {
    // get form
    let form = req.body;
    // get project_id
    let project_id = req.params.project_id;
    // get id
    let id = req.params.id;
    // get bug information from the table
    let bug_info = await Bug.findOne({
        where: {
            id: id
        }
    });
    let bug_json = bug_info.dataValues;

    // get requester GID
    let username = "zeceLaWeb";
    if (req.session.user) {
        username = req.session.user.username;
    }
    // get GID from username
    let requester_gid = await Student.findOne({
        where: {
            username: username
        },
        attributes: [ 'gid' ]
    });
    requester_gid = requester_gid.dataValues.gid;

    // get project information
    let project_info = await Software_Project.findOne({
        where: {
            id: project_id
        }
    });
    project_info = project_info.dataValues;

    // get team id of project where the bug belongs to
    let team_id = await Team_Member.findOne({
        where: {
            id: project_info.owner_id
        },
        attributes: [ 'team_id' ]
    });
    team_id = team_id.dataValues.team_id;

    // check if user is tester or not
    let tester = true;
    tester = await Team_Member.findOne({
        attributes: [ 'is_admin' ],
        include: {
            model: Team,
            required: true
        },
        where: {
            team_id: team_id,
            member_gid: requester_gid
        }
    });
    if (tester) {
        tester = false;
    } else {
        tester = true;
    };

    let updated_bug_json = {};
    if (tester == false) {
        // if USER is member of team of project -> {description, status, solution_link}
        //              if solution_link is modified we assume that the user who sends the PATCH request
        
        // check if solution_link is the same
        if (bug_json.solution_link == form.solution_link) {
            // fixer is the same
            updated_bug_json = {
                description: form.description,
                status: form.state
            };
        } else {
            // fixer is the requester
            updated_bug_json = {
                description: form.description,
                status: form.state,
                fixer_gid: requester_gid,
                solution_link: form.solution_link
            };
        }
    } else {
        // if USER is tester -> {name, description, link, severity} will be modified
        let severity = 0;
        if (form.severity == "SERIOUS") {
            severity = 1;
        } else if (form.severity == "MINOR") {
            severity = 2;
        }
        updated_bug_json = {
            name: form.name,
            description: form.description,
            link: form.link,
            severity: severity
        };
    }
    await Bug.update(updated_bug_json, {
        where: {
            id: id
        }
    });

    return res.sendStatus(200);
};

// /api/:project_id/bug/:id/assign - POST
const AssignBug = async (req, res) => {
    // get project id - might not need it but just in case
    let project_id = req.params.project_id;
    // get id of bug
    let id = req.params.id;

    // get requester username
    let username = "zeceLaWeb";
    if (req.session.user) {
        username = req.session.user.username;
    }
    // get GID from username
    let requester_gid = await Student.findOne({
        where: {
            username: username
        },
        attributes: [ 'gid' ]
    });
    requester_gid = requester_gid.dataValues.gid;

    await Bug.update({fixer_gid: requester_gid},
        { where: {
            id: id
        }});

    return res.sendStatus(200);
};

// /api/:project_id/bug/:id/assign - DELETE
const UnassignBug = async (req, res) => {
    // get project id - might not need it but just in case
    let project_id = req.params.project_id;
    // get id of bug
    let id = req.params.id;

    // get requester username
    let username = "zeceLaWeb";
    if (req.session.user) {
        username = req.session.user.username;
    }
    // get GID of requester
    let requester_gid = await Student.findOne({
        where: {
            username: username
        },
        attributes: [ 'gid' ]
    });
    requester_gid = requester_gid.dataValues.gid;

    // get bug
    let bug = Bug.findOne({
        where: {
            id: id
        }
    });

    await Bug.update({
        fixer_gid: null,
        solution_link: null,
    },{
        where: {
            id: id
        }
    });

    return res.sendStatus(200);
};

// /api/:project_id/bug/:id/status - PATCH
const UpdateStatus = async (req, res) => {
    // get project id - might not need it but just in case
    let project_id = req.params.project_id;
    // get id of bug
    let id = req.params.id;

    // get new status
    let status = req.body.state;

    // get bug
    let bug = Bug.findOne({
        where: {
            id: id
        }
    });

    await bug.update({
        status: status
    });

    return res.sendStatus(200);
};

module.exports = {
    GetSessionUser, 
    GetAllTeams, 
    GetOneTeam, 
    AddOneTeam, 
    TeamJoin, 
    TeamLeave, 
    AddOneProject, 
    GetOneProject, 
    AddOneBug,
    GetOneBug, 
    EditOneBug, 
    AssignBug, 
    UnassignBug, 
    UpdateStatus
}