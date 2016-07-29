// import * as express from "express";
// // import { Application } from "express";

// let app: express.Application = express();

// app.get("/", function(req, res) {
//   res.status(200);
//   res.json({ name: "lm" });
// });

// // let port = process.env.PORT || 1410;
// // let env = process.env.NODE_ENV || "development";
// // let server = app.listen(port, function () {
// //     console.log("Express server listening on %d in %s mode", server.address().port, env);
// // });

// // app.listen(1410, function () {
// //     console.log("Express server listening on %d in %s mode", 1410, "env");
// // });

// export default app;

let express = require("express");

let app = express();

app.get("/user", function (req, res) {
  res.status(200).json({ name: "tobi" });
});

// // if (!module.parent) {
// let server = app.listen(1410, function () {
//   console.log("Express server listening on port 1410");
// });
// // }

// export { app, server}

export { app }