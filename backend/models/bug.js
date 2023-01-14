const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Bug = sequelize.define("bugs", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    software_project_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reporter_gid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    severity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "NOT SOLVED"
    },
    fixer_gid: {
        type: DataTypes.STRING,
        allowNull: true
    },
    solution_link: {
        type: DataTypes.STRING,
        allowNull: true
    }
    
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = {
    Bug
};