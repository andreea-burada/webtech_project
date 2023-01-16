const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Student = sequelize.define("students", {
    gid: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true
    },
    first_name: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING(128),
        allowNull: false
    }
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

const Student_findByEmail = async (_email) => {
    let result = await Student.findOne({
        where: {
            email : _email
        }
    }).then(res => {
        return res;
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });
};

const Student_findByUsername = async (_username) => {
    let result = await Student.findOne({
        where: {
            username : _username
        }
    }).then(res => {
        return res;
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });
};

module.exports = {
    Student, Student_findByEmail, Student_findByUsername
}
