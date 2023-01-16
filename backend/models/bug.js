const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Bug = sequelize.define("bugs", {
    id: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    software_project_id: {
        type: DataTypes.INTEGER(5),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    severity: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 1
    },
    link: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: "NOT SOLVED"
    },
    solution_link: {
        type: DataTypes.STRING(255),
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