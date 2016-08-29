import * as express from "express";
import allRoutes from "./routes";

let app: express.Application = express();

allRoutes(app);

export { app }