const { DataTypes } = require("sequelize");
const { Student } = require("../models/student");
const { Team } = require("./team");
const { Team_Member } = require("./team_member");
const { Software_Project } = require("./software_project");
const { Bug } = require("./bug");

function relateTables (){
    // one-to-many: student -> team_member
    // foreign key: member_gid
    Student.hasMany(Team_Member,
        {
            foreignKey: "member_gid",
            keyType: DataTypes.INTEGER
        });
    Team_Member.belongsTo(Student, {
        foreignKey: "member_gid"
    });
    // one-to-many: team -> team_member
    // foreign key: team_id
    Team.hasMany(Team_Member,
        {
            foreignKey: "team_id",
            keyType: DataTypes.INTEGER
        });
    Team_Member.belongsTo(Team, {
        foreignKey: "team_id"
    });

    // one-to-many: team_members -> software_project
    // foreign key: owner_id
    Team_Member.hasMany(Software_Project,
        {
            foreignKey: "owner_id",     // refers to the entry in table "team_members" not a student GID
            keyType: DataTypes.INTEGER
        });
    Software_Project.belongsTo(Team_Member, {
        foreignKey: "owner_id"
    });

    // one-to-many: students -> bug
    // foreign key: reporter_gid
    Student.hasMany(Bug,
        {
            foreignKey: "reporter_gid",
            keyType: DataTypes.STRING
        });
    Bug.belongsTo(Student, {
        foreignKey: "reporter_gid"
    });

    // one-to-many: students -> bug
    // foreign key: fixer_gid
    Student.hasMany(Bug,
        {
            foreignKey: "fixer_gid",
            keyType: DataTypes.STRING
        });
    Bug.belongsTo(Student, {
        foreignKey: "fixer_gid"
    });

    // one-to-many: software_project -> bug
    // foreign key: software_project_id
    Software_Project.hasMany(Bug,
        {
            foreignKey: "software_project_id",
            keyType: DataTypes.INTEGER
        });
    Bug.belongsTo(Software_Project, {
        foreignKey: "software_project_id"
    })
};

module.exports = {
    relateTables
}