const MessageController = require('../controllers/message.controller');
const Users = require('../controllers/users.controller');


module.exports = function(app) {
    app.post("/api/parent/message/:id", MessageController.createMessage);
    app.get("/api/view/child/messages/:id",  MessageController.getAllChildMessages);
}