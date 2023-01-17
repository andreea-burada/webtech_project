const fs = require('fs');
const path = require('path');

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');

app.use(express.static('..\\frontend\\app'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.set('trust proxy', 1);
// app.use(cookieSession({
//     name: 'session',
//     secret: "adadddefuaihiuehfaaf",
//     maxAge: 24 * 60 * 60 * 1000     // 24 hours
// }));

var corsOptions = {
    origin: 'http://localhost:3000',     // frontend
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(session({
    secret: "adadddefuaihiuehfaaf", // need to make more secure
    resave: true, 
    saveUninitialized: true,
    httpOnly: true,
    cookie: { 
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

// setupDB
const { setupDB } = require('../models/tables');
setupDB();


// routes
const { 
    RegisterRoute,
    LoginRoute,
    LogoutRoute
} = require("./routes");

// apis
const { 
    GetSessionUser, 
    GetAllTeams, 
    GetOneTeam, 
    AddOneTeam, 
    TeamJoin, 
    TeamLeave, 
    AddOneProject, 
    GetOneProject, 
    AddOneBug, 
    EditOneBug, 
    AssignBug, 
    UnassignBug, 
    UpdateStatus,
    GetOneBug
} = require("./apis");

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, `..\\..\\frontend\\app\\public\\templates\\login_page.html`));
});


app.get('/api/user', GetSessionUser);

// team routes
app.get('/api/team/all', GetAllTeams);
app.get('/api/team/:id', GetOneTeam);
app.post('/api/team/add', AddOneTeam);
app.patch('/api/team/:id', TeamJoin);
app.delete('/api/team/:id', TeamLeave);

// project routes
app.post('/api/team/:team_id/project/add', AddOneProject);
app.get('/api/team/:team_id/project/:id', GetOneProject);

// bug routes
app.post('/api/:project_id/bug/add', AddOneBug);
app.get('/api/:project_id/bug/:id', GetOneBug);
app.patch('/api/:project_id/bug/:id', EditOneBug);
app.post('/api/:project_id/bug/:id/assign', AssignBug);
app.delete('/api/:project_id/bug/:id/assign', UnassignBug);
app.patch('/api/:project_id/bug/:id/status', UpdateStatus);

app.post('/register', RegisterRoute);

app.post('/login', LoginRoute);

app.post('/logout', LogoutRoute);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
