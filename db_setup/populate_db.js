// import MySQL
var mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");
const { generateSalt, hashPassword } = require("../backend/utils/utils.js");

// establish connection
var database = mysql.createPool({
  host: "localhost",
  user: "webtech_project",
  password: "10laWebTech",
  database: "webtech_project",
  multipleStatements: true,
  dateStrings: true,
});

var jsonStudents = [
  {
    first_name: "Maricica",
    last_name: "Ionela",
    email: "maricica.ionela@stud.ase.ro",
    username: "m.micuta",
    password: "caTelul78",
  },
  {
    first_name: "Mircea",
    last_name: "Popescu",
    email: "mircea_popescu@stud.ase.ro",
    username: "barosanulXXL",
    password: "p.Pop111",
  },
  {
    first_name: "Proiect",
    last_name: "WebTech",
    email: "zeceLaWeb@stud.ase.ro",
    username: "zeceLaWeb",
    password: "10LaWeb",
  },
  {
    first_name: "Abrahim",
    last_name: "Fredrick",
    email: "abrahimfred@stud.ase.ro",
    username: "chifteleGratis",
    password: "mmmSarmale1",
  },
  {
    first_name: "Marcel",
    last_name: "Ciolacu",
    email: "m_ciolacu@stud.ase.ro",
    username: "theGrimReaper",
    password: "1@3abC",
  },
  {
    first_name: "Alexandra",
    last_name: "Diaconu",
    email: "alexandra.diaconu22@stud.ase.ro",
    username: "alexya",
    password: "ioanaDD2",
  },
  {
    first_name: "Razvan",
    last_name: "Mihalache",
    email: "razvi.mihai@stud.ase.ro",
    username: "razvi0501",
    password: "oldGold10",
  },
  {
    first_name: "Ioana",
    last_name: "Apostol",
    email: "apostolioana@stud.ase.ro",
    username: "ioana.ap",
    password: "Parola123",
  },
  {
    first_name: "Jean",
    last_name: "Monreal",
    email: "jeanica.monaco@stud.ase.ro",
    username: "jeanDelaCraiova",
    password: "covrigInCoada45",
  },
  {
    first_name: "Luca",
    last_name: "Kent",
    email: "kent.luca@stud.ase.ro",
    username: "tigariLa1Leu",
    password: "jk@sad12",
  },
  {
    first_name: "Julia",
    last_name: "Smith",
    email: "j.smith@stud.ase.ro",
    username: "julya1",
    password: "Parola@11",
  },
  {
    first_name: "Rares",
    last_name: "Constantin",
    email: "rares.constantin20@stud.ase.ro",
    username: "bmwMaicute",
    password: "lol1010PP",
  },
  {
    first_name: "Esparangus",
    last_name: "Rodrigues",
    email: "esp.rod@stud.ase.ro",
    username: "esperanza",
    password: "Espania10",
  },
  {
    first_name: "Karina",
    last_name: "Ureche",
    email: "karina.ureche19@stud.ase.ro",
    username: "btsArmy99",
    password: "vreauInJaponia1",
  },
  {
    first_name: "Trish",
    last_name: "Johnson",
    email: "trish_john@stud.ase.ro",
    username: "dollyP",
    password: "password@123",
  },
];

database.getConnection(function (error, connection) {
  if (error) console.log(error);

  connection.query(
    `
        DELETE FROM bugs;
        ALTER TABLE bugs AUTO_INCREMENT = 1;
        DELETE FROM software_projects;
        ALTER TABLE software_projects AUTO_INCREMENT = 1;
        DELETE FROM team_members;
        ALTER TABLE team_members AUTO_INCREMENT = 1;
        DELETE FROM teams;
        ALTER TABLE teams AUTO_INCREMENT = 1;
        DELETE FROM students;
        ALTER TABLE students AUTO_INCREMENT = 1;
        `,
    function (error, results) {
      connection.release();
      if (error) console.log(error);
    }
  );
  console.log("Deleted tables");
  var gid_array = [];
  jsonStudents.map((currentStudent) => {
    // register student into db
    let salt = generateSalt();
    let student = {
      gid: String(uuidv4()),
      first_name: currentStudent.first_name,
      last_name: currentStudent.last_name,
      email: currentStudent.email,
      username: currentStudent.username,
      password: String(hashPassword(currentStudent.password, salt)),
      salt: String(salt),
    };
    gid_array.push({gid: student.gid});
    connection.query(
      `
            -- insert student
            INSERT INTO students (gid, first_name, last_name, email, username, password, salt) VALUES ("${student.gid}", "${student.first_name}", "${student.last_name}", "${student.email}", "${student.username}", "${student.password}", "${student.salt}");
            `,
      function (error, results) {
        connection.release();
        if (error) console.log(error);
      }
    );
    console.log("Inserted student");
  });

  //console.log(gid_array);

  connection.query(
    `
        -- teams
        INSERT INTO teams (name, slogan, initials) VALUES ("Bastinasii", "Uga Uga Uga", "BDSM");
        INSERT INTO teams (name, slogan, initials) VALUES ("vulpitele", "Suntem sirete si cochete", "VULP");
        INSERT INTO teams (name, slogan, initials) VALUES ("O2-CO2", "Chemistry is among all of us", "GAZ");
        INSERT INTO teams (name, slogan, initials) VALUES ("Frati Patati", "Cei trei frati patati s-au apucat sa faca proiecte soft.", "TRPT");
        INSERT INTO teams (name, slogan, initials) VALUES ("Macarale", "blank", "MCRL");
        INSERT INTO teams (name, slogan, initials) VALUES ("lumanarele", "Va ardem", "ZNP");

        -- team members
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[0].gid}", 1, 1, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[1].gid}", 1, 0, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[2].gid}", 1, 0, 0);

        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[2].gid}", 2, 1, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[6].gid}", 2, 0, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[8].gid}", 2, 0, 0);

        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[ 3].gid}", 3, 1, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[10].gid}", 3, 0, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[11].gid}", 3, 0, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[12].gid}", 3, 0, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[13].gid}", 3, 0, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[14].gid}", 3, 0, 0);

        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[ 0].gid}", 4, 1, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[ 1].gid}", 4, 0, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[ 4].gid}", 4, 0, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[ 8].gid}", 4, 0, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[10].gid}", 4, 0, 0);

        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[6].gid}", 5, 1, 0);
        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[7].gid}", 5, 0, 0);

        INSERT INTO team_members (member_gid, team_id, is_admin, tester) VALUES ("${gid_array[7].gid}", 6, 1, 0);

        -- software_projects
        INSERT INTO software_projects (name, description, repo_link, owner_id) VALUES ("Mobile Application for Car Wash", "desc 1", "dummy link 1", 12);
        INSERT INTO software_projects (name, description, repo_link, owner_id) VALUES ("Basic OOP Project", "desc 2", "dummy link 2", 7);
        INSERT INTO software_projects (name, description, repo_link, owner_id) VALUES ("Online Horoscope", "desc 3", "dummy link 3", 2);

        -- bugs
        `,
    function (error, results) {
      connection.release();
      if (error) console.log(error);
      database.end();
    }
  );
  console.log("Inserted teams");
});
