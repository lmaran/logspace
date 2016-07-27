import * as express from "express";
// import { Application } from "express";

let app: express.Application = express();

app.get("/user", function(req, res) {
  res.status(200);
  res.json({ name: "lm" });
});

// let port = process.env.PORT || 1410;
// let env = process.env.NODE_ENV || "development";
// let server = app.listen(port, function () {
//     console.log("Express server listening on %d in %s mode", server.address().port, env);
// });

export default app;