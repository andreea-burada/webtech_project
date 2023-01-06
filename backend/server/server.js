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

app.use(express.static('../frontend'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.set('trust proxy', 1);
// app.use(cookieSession({
//     name: 'session',
//     secret: "adadddefuaihiuehfaaf",
//     maxAge: 24 * 60 * 60 * 1000     // 24 hours
// }));
app.use(cors());
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


// routes
const { 
    RegisterRoute,
    LoginRoute,
    LogoutRoute
} = require("./routes");

// apis
const { 
    GetSessionUser 
} = require("./apis");

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, `..\\..\\frontend\\templates\\login_page.html`));
});

app.get('/api/user', GetSessionUser);

app.post('/register', RegisterRoute);

app.post('/login', LoginRoute);

app.post('/logout', LogoutRoute);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
