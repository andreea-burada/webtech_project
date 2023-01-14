const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Team_Member = sequelize.define("team_members", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    is_admin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tester: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = {
    Team_Member
}