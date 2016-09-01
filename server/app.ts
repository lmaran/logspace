import config from "./config/environment";
import initialize from "./initialize";
import * as express from "express";

let app: express.Application = express();
app = initialize(app);

let server = app.listen(config.port, function () {
    console.log(`Express server listening on port ${config.port} in ${config.env} mode`);
});

export default server;