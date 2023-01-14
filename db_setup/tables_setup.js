// import MySQL
var mysql = require('mysql2');

// establish connection
var database = mysql.createPool({
    host: "localhost",
    user: "webtech_project",
    password: "10laWebTech",
    database: "webtech_project",
    multipleStatements: true,
    dateStrings: true
});

database.getConnection(function(error, connection) {
    if(error) 
        console.log(error);

    connection.query(`
        DROP TABLE IF EXISTS bugs;
        DROP TABLE IF EXISTS software_projects;
        DROP TABLE IF EXISTS team_members; 
        DROP TABLE IF EXISTS teams;
        DROP TABLE IF EXISTS students;
        CREATE TABLE students (gid varchar(36) NOT NULL, first_name varchar(30) NOT NULL, last_name varchar(30), email varchar(50) NOT NULL UNIQUE, password varchar(128) NOT NULL, salt varchar(64) NOT NULL, username varchar(25) NOT NULL UNIQUE, PRIMARY KEY (gid));
        CREATE TABLE team_members (id int(5) NOT NULL AUTO_INCREMENT, tester int(1) NOT NULL, member_gid varchar(36) NOT NULL, team_id int(5) NOT NULL, is_admin int(1) NOT NULL, PRIMARY KEY (id));
        CREATE TABLE teams (id int(5) NOT NULL AUTO_INCREMENT, name varchar(35) NOT NULL UNIQUE, slogan varchar(350), initials varchar(4) NOT NULL UNIQUE, PRIMARY KEY (id));
        CREATE TABLE software_projects (id int(5) NOT NULL AUTO_INCREMENT, name varchar(35) NOT NULL UNIQUE, description varchar(350), repo_link varchar(255) NOT NULL UNIQUE, owner_id int(5) NOT NULL, PRIMARY KEY (id));
        CREATE TABLE bugs (id int(5) NOT NULL AUTO_INCREMENT, severity int(1) NOT NULL, description varchar(350), link varchar(255) NOT NULL, solution_link varchar(255), status varchar(15), software_project_id int(5) NOT NULL, reporter_gid varchar(36) NOT NULL, fixer_gid varchar(36) NOT NULL, PRIMARY KEY (id));
        ALTER TABLE team_members ADD CONSTRAINT fk_team_members_students FOREIGN KEY (member_gid) REFERENCES students (gid);
        ALTER TABLE team_members ADD CONSTRAINT fk_team_members_teams FOREIGN KEY (team_id) REFERENCES teams (id);
        ALTER TABLE bugs ADD CONSTRAINT fk_bugs_soft_project FOREIGN KEY (software_project_id) REFERENCES software_projects (id);
        ALTER TABLE bugs ADD CONSTRAINT fk_bugs_fixer FOREIGN KEY (reporter_gid) REFERENCES students (gid);
        ALTER TABLE bugs ADD CONSTRAINT fk_bugs_reporter FOREIGN KEY (fixer_gid) REFERENCES students (gid);
        ALTER TABLE software_projects ADD CONSTRAINT fk_soft_owner FOREIGN KEY (owner_id) REFERENCES team_members (id);`, function(error, results) {
            connection.release();
            if(error) 
                console.log(error);
            console.log('Tables created successfully.');
            database.end();
    });
});

