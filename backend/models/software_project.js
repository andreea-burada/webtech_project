const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Software_Project = sequelize.define("software_projects", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    repo_link: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = {
    Software_Project
};