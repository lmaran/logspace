import * as express from "express";
import router from "./routes";

let app: express.Application = express();

app.use("/", router);

export { app }