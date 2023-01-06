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
            res.json({"message": `Student with email ${student.email} already exists.`});
        } 
        // check if student username exists in DB 
        else if (await Student.findOne({where:{username:String(student.username)}}) != null) {
            res.json({"message": `Student with username ${student.username} already exists.`});
        } 
        else {
            let newStudent = new Student(student);
            newStudent.save();
            console.log("Student added.");
            res.redirect("/");
        }
    }
    catch (error) {
        console.log(error);
        res.sendFile(String(path.resolve(`${__dirname}\\..\\..\\frontend\\templates\\login_page.html`)));
    }
}


// path: /login
// Receives username and password, checks if account with given username exists and then if passwords match
// If yes -> return JSON
const LoginRoute = async (req, res) => {
    try {
        let form = req.body;
        
        // check if account with given username exists
        let student = await Student.findOne({where:{username:String(form.username)}});
        if (student == null) {
            // username does not exist
            return res.json({"message": `account with username ${form.username} does not exist.`});
        }
        else {
            // verify password
            let isCorrect = verifyPassword(form.password, student.dataValues.salt, student.dataValues.password);
            if (isCorrect == true) {
                req.session.user = student;
                return res.redirect("/");
            } 
            else {
                return res.redirect("/");
            }
        }
    }
    catch (error) {
        return res.status(404).json({error: "Internal Server Error"});
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