// imports
const { path } = require("path");
const { v4: uuidv4 } = require('uuid');
// local imports
const { Student, Student_findByEmail, Student_findByUsername } = require("../models/student");
const { generateSalt, hashPassword } = require("../utils/utils.js");


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
        if (await Student_findByEmail(student.email) != null) {
            res.json({"message": `Student with email ${student.email} already exists.`});
        } // check if student username exists in DB 
        else if (await Student_findByUsername(student.username) != null) {
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
    let form = req.body;
    
    // check if account with given username exists
    let student = null;
    await Student_findByUsername(form.username).then(foundStudent => {
        student = foundStudent;
    });
    if (student == null) {
        // username does not exist
        return res.json({"message": `account with username ${form.username} does not exist.`});
    }
    else {
        // verify password
        let isCorrect = verifyPassword(form.password, student.salt, student.password);
        if (isCorrect == true) {
            return res.json({"message": "logged in!"});
        } 
        else {
            return res.redirect("/");
        }
    }
};


module.exports = {
    RegisterRoute,
    LoginRoute
}