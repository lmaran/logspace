import * as express from "express";
// import router from "./routes";
import { allRoutes } from "./routes";

let app: express.Application = express();

// app.use("/", router);
allRoutes(app);

export { app }