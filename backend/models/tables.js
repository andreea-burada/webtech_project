const { DataTypes } = require("sequelize");
const { Student } = require("../models/student");
const { Team } = require("./team");
const { Team_Member } = require("./team_member");
const { Software_Project } = require("./software_project");
const { Bug } = require("./bug");
const { relateTables } = require("./relations");
const { sequelize } = require("./db");

relateTables();

const createTables = async () => {
    await sequelize.drop();
    await Student.sync();
    await Team.sync();
    await Team_Member.sync();
    await Software_Project.sync();
    await Bug.sync();
};

module.exports = {
    createTables
}