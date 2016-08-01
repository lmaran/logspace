"use strict";
var environment_1 = require("./config/environment");
var server_1 = require("./server");
var server = server_1.app.listen(environment_1.default.port, function () {
    console.log("Express server listening on port " + environment_1.default.port + " in " + environment_1.default.env + " mode");
});
exports.server = server;

//# sourceMappingURL=app.js.map
