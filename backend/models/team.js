const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Team = sequelize.define("teams", {
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
    slogan: {
        type: DataTypes.STRING(350),
        allowNull: true
    },
    initials: {
        type: DataTypes.STRING(4),
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
    Team
};