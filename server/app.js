"use strict";
var serverApp_1 = require("./serverApp");
var logger_1 = require("./logging/logger");
var environment_1 = require("./config/environment");
var server = serverApp_1.default.listen(environment_1.default.port, function () {
    logger_1.default.warn("Express server listening on %d in %s mode", server.address().port, environment_1.default.env);
});

//# sourceMappingURL=app.js.map
