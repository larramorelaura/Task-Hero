const ChoreController = require('../controllers/chore.controller');
const Users = require('../controllers/users.controller');


module.exports = function(app) {
    app.post("/api/chore/create/:parentId", Users.allowIfLoggedin,  Users.grantAccess('createAny', 'chore'), ChoreController.createChore);
    app.put("/api/chore/edit/:id", ChoreController.updateChoreStatus)
    app.get("/api/view/chore/:id", ChoreController.getOne);
    app.get("/api/view/chores/:id",  ChoreController.getAll);
}