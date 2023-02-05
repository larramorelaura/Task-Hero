const RewardController = require('../controllers/reward.controller');
const Users = require('../controllers/users.controller');


module.exports = function(app) {
    app.post("/api/rewards/create/:parentId",  Users.allowIfLoggedin,  Users.grantAccess('createAny', 'reward'), RewardController.createReward);
    app.put("/api/rewards/edit/:id", RewardController.updateRewardStatus)
    app.get("/api/view/rewards/:id", RewardController.getOne);
    app.get("/api/parent/view/rewards/:id", RewardController.getAll);
}