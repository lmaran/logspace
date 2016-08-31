// import config from "./config/environment";
// import { app } from "./server";
import expressCfg from "./configure";
import * as express from "express";

var xxx = require("./configure");
var yyy = require("express");
console.log(yyy);

let app = express();
app = expressCfg(app);

// let server = app.listen(config.port, function () {
//     console.log(`Express server listening on port ${config.port} in ${config.env} mode`);
// });

let server = app.listen(1410, function () {
    console.log("aaa");
});

// export { server }