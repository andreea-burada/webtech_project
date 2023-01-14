const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Team = sequelize.define("teams", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: 'citext',
        allowNull: false
    },
    slogan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    initials: {
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
    Team
};