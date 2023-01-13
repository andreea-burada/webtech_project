const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Student = sequelize.define("students", {
    gid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
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
