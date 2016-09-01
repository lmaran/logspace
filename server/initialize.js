"use strict";
var routes_1 = require("./routes");
var environment_1 = require("./config/environment");
var exphbs = require("express-handlebars");
var initialize = function (app) {
    app.set("views", environment_1.default.root + "/server/views");
    app.engine(".hbs", exphbs({
        defaultLayout: "main",
        extname: ".hbs",
        // in the feature we probably don"t need the next 2 lines
        // https://github.com/ericf/express-handlebars/issues/147#issuecomment-159737839
        layoutsDir: environment_1.default.root + "/server/views/layouts/",
        partialsDir: environment_1.default.root + "/server/views/partials/",
    }));
    app.set("view engine", ".hbs");
    routes_1.default(app);
    return app;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initialize;

//# sourceMappingURL=initialize.js.map
