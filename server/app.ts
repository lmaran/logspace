import config from "./config/environment";
import { app } from "./server";

let server = app.listen(config.port, function () {
    console.log(`Express server listening on port ${config.port} in ${config.env} mode`);
});

export { server }