"use strict";
var server_1 = require("./server");
var server;
exports.server = server;
// if (!module.parent) {
server = server_1.app.listen(1410, function () {
    console.log("Express server listening on port 1410");
});
// }

//# sourceMappingURL=app.js.map
