
// // Set default node environment to development
// // keep it as first line
// process.env.NODE_ENV = process.env.NODE_ENV || "development";

import * as express from "express";
import config from "./config/environment";
import router from "./routes";
import logger from "./logging/logger";
import errorLogHandler from "./logging/errorLogHandler";
import expressConfig from "./config/express";

let app: express.Application = express();
expressConfig(app);

app.use("/", router);

// catch 404 and 500
// see here: https://github.com/koroandr/generator-express-typescript/blob/master/generators/app/templates/app.ts

// Handle error has to be last: http://expressjs.com/en/guide/error-handling.html
app.use(errorLogHandler());


// Start server, but not for tests
if (require.main === module) { // https://nodejs.org/docs/latest/api/all.html#modules_accessing_the_main_module
    app.listen(config.port, function () { // https://gist.github.com/umidjons/c136e7d036af2d7fb8d012401d8d8187
        logger.warn("Express server listening on %d in %s mode", config.port, config.env);
    });
}

export default app;