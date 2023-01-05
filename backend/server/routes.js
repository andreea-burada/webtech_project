// imports
const { sequelize } = require("../models/db");
const { Student, Student_findByEmail, Student_findByUsername } = require("../models/student");
const { generateSalt, hashPassword } = require("../utils/utils.js");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

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
        res.sendFile(String(path.resolve(`${__dirname}\\..\\templates\\login_page.html`)));
    }
}

module.exports = {
    RegisterRoute
}