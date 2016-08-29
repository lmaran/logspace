import * as express from "express";
import allRoutes from "./routes";

let app: express.Application = express();

// app.use("/", router);
allRoutes(app);

export { app }