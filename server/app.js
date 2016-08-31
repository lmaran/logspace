"use strict";
// import config from "./config/environment";
// import { app } from "./server";
var configure_1 = require("./configure");
var express = require("express");
var xxx = require("./configure");
var yyy = require("express");
console.log(yyy);
var app = express();
app = configure_1.default(app);
// let server = app.listen(config.port, function () {
//     console.log(`Express server listening on port ${config.port} in ${config.env} mode`);
// });
var server = app.listen(1410, function () {
    console.log("aaa");
});
// export { server } 

//# sourceMappingURL=app.js.map
