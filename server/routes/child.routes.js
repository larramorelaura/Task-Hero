const ChildController = require('../controllers/child.controller');
const Users = require('../controllers/users.controller');
const { authenticate} = require('../config/jwt.config');

module.exports = function(app) {
    app.post("/api/child/register",  Users.allowIfLoggedin,  Users.grantAccess('createAny', 'profile'), ChildController.register );
    app.post("/api/child/login", ChildController.login);
    app.post("/api/child/logout", ChildController.logout);
    app.get("/api/view/child/:id", ChildController.getOne);
    app.put("/api/child/:id", ChildController.addPoints);
    app.put("/api/child/points/:id", ChildController.addOnePoint);
    app.put("/api/child/rewards/edit/:id", ChildController.subtractPoints);
    app.get("/api/parent/view/allchildren/:id", ChildController.getAllWithParent);
}