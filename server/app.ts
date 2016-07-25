import app from "./serverApp";
import logger from "./logging/logger";
import config from "./config/environment";

let server = app.listen(config.port, function () {
    logger.warn("Express server listening on %d in %s mode", server.address().port, config.env);
});