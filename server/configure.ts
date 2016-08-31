// import * as express from "express";
import allRoutes from "./routes";

// let app: express.Application = express();

let expressCfg = function(app){
    allRoutes(app);
    return app;
};

export default expressCfg;