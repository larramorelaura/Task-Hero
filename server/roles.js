
// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

module.exports.roles = (function() {
ac.grant("child")
    .readOwn("profile")
    .updateOwn("profile")
    .updateAny("chore")
    .readAny("reward")
    .readAny("chore")

ac.grant("parent")
    .extend("child")
    .createAny("profile")
    .createAny("reward")
    .createAny("chore")
    
    .readAny("profile")
    .updateAny("profile")
    .updateAny("chore")
    .updateAny("reward")
    
    .deleteAny("profile")
    .deleteAny("reward")
    .deleteAny("chore")
    

    

return ac;
})();