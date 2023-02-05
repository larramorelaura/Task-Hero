const Users = require('../controllers/users.controller');
const { authenticate} = require('../config/jwt.config');

module.exports = function(app) {
    app.post("/api/parent/register", Users.register);
    app.post("/api/parent/login", Users.login);
    app.post("/api/parent/logout", Users.logout);
    app.get("/api/parent/view/:id",  Users.getOne);
    
}