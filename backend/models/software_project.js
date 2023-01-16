const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Software_Project = sequelize.define("software_projects", {
    id: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(35),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING(350),
        allowNull: true
    },
    repo_link: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
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