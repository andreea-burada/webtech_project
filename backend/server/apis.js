const { path } = require("path");
// /api/user
// returns session user; if no user was set, it returns null
const GetSessionUser = (req, res) => {
    // If you were using a DB, you would test for the user's id not their username probably
    if (req.session.user) {
        // If you were using a DB, you would use their user id to query the DB and send the entire user object to the front in this endpoint
        let user_json = {
            username: req.session.user.username
        }
        res.status(200).json(user_json);
   } else {
        res.status(404).send({message: "No user logged in"});
   }
}

module.exports = {
    GetSessionUser
}