const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
const { RegisterRoute,
        LoginRoute
} = require("./routes");

app.get('/', (req, res) => {
    res.sendFile(String(path.resolve(`${__dirname}\\..\\templates\\login_page.html`)));
});

app.post('/register', RegisterRoute);

app.post('/login', LoginRoute);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
