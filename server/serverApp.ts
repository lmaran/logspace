import * as express from "express";
import router from "./routes";
import errorLogHandler from "./middlewares/errorLogHandler";
import expressConfig from "./config/express";

let app: express.Application = express();
expressConfig(app);

app.use("/", router);

// catch 404 and 500
// see here: https://github.com/koroandr/generator-express-typescript/blob/master/generators/app/templates/app.ts

// Handle error has to be last: http://expressjs.com/en/guide/error-handling.html
app.use(errorLogHandler);

export default app;