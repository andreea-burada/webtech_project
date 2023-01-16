// imports
const { path } = require("path");
const { v4: uuidv4 } = require('uuid');
// local imports
const { Student, Student_findByEmail, Student_findByUsername } = require("../models/student");
const { generateSalt, hashPassword, verifyPassword } = require("../utils/utils.js");


// path: /register
const RegisterRoute = async (req, res) => {
    let form = req.body;
    // create new student
    let salt = generateSalt();
    let student = {
        gid: String(uuidv4()),
        first_name: form.firstname,
        last_name : form.lastname,
        email: form.email,
        username: form.username,
        password: String(hashPassword(form.password, salt)),
        salt: String(salt)
    }
    try {
        // check if student email exists in DB
        if (await Student.findOne({where:{email:String(student.email)}}) != null) {
            res.status(406).json({"message": `Student with email ${student.email} already exists.`});
        } 
        // check if student username exists in DB 
        else if (await Student.findOne({where:{username:String(student.username)}}) != null) {
            res.status(406).json({"message": `Student with username ${student.username} already exists.`});
        } 
        else {
            let newStudent = new Student(student);
            newStudent.save();
            console.log("Student added.");
            return res.status(200).json({message: "Student added."});
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}


// path: /login
// Receives username and password, checks if account with given username exists and then if passwords match
// If yes -> return JSON
const LoginRoute = async (req, res) => {
    try {
        let form = req.body;

        if (form.username == '') {
            return res.status(400).json({message: "Username cannot be empty"});
        }
        else if (form.password == '') {
            return res.status(400).json({message: "Password cannot be empty"});
        }
        else {
            // check if account with given username exists
            let student = await Student.findOne({where:{username:String(form.username)}});
            if (student == null) {
                // username does not exist
                return res.status(404).json({"message": `Account with username "${form.username}" does not exist.`});
            }
            else {
                // verify password
                let isCorrect = verifyPassword(form.password, student.dataValues.salt, student.dataValues.password);
                if (isCorrect == true) {
                    req.session.user = student;
                    return res.status(200).json({message: "New session established"});
                } 
                else {
                    return res.status(403).json({message: "Password incorrect. Please try again"});
                }
            }
        }
    }
    catch (error) {
        return res.status(500).json({error: "Internal Server Error"});
    }
};


// path: /logout
// 
const LogoutRoute = async (req, res) => {
    console.log('API call to /logout.');
    if (req.session.user) {
        // delete session
        req.session.destroy(error => {
            if (error) {
                console.log('Sending 403.');
                res.status(403).send("Unable to log out.");
            } else {
                console.log('Sending 200.');
                res.status(200).send("OK");
            }
        });
    } else {
        console.log('Sending 400.');
        res.status(400).send("No user logged in.");
    }
};

module.exports = {
    RegisterRoute,
    LoginRoute,
    LogoutRoute
}