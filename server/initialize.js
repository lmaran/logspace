"use strict";
var routes_1 = require("./routes");
var environment_1 = require("./config/environment");
var express = require("express");
var path = require("path");
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
    if (environment_1.default.env === "production" || environment_1.default.env === "staging") {
    }
    else {
        // // app.use(favicon(path.join(config.root, "client", "favicon.ico")));
        // // if you are happy with a browser plugin, then you don"t need this middleware
        // // live-reload corrupts pdf files: http://stackoverflow.com/a/28091651/2726725
        // app.use(require("connect-livereload")({
        //     port: 35729, // default=35729
        //     ignore: [/print/]  // all that contains "print": https://github.com/intesso/connect-livereload#options
        // }));
        // without last argument express serves index.html even when my routing is to a different file:
        // http://stackoverflow.com/a/25167332/2726725
        // It is also recommended to put static middleware first: http://stackoverflow.com/a/28143812/2726725
        // Have this pb. only when I try to serve another jade page as homepage
        app.use("/", express.static(path.join(environment_1.default.root, "client"), { index: "_" }));
        app.use("/node_modules", express.static(path.join(environment_1.default.root, "node_modules"))); // to serve node_modules
    }
    // add a second static source for static files:
    // http://stackoverflow.com/questions/5973432/setting-up-two-different-static-directories-in-node-js-express-framework
    app.use("/public", express.static(path.join(environment_1.default.root, "server/public")));
    // for js files used by some views
    app.use("/views", express.static(path.join(environment_1.default.root, "server/views")));
    routes_1.default(app);
    return app;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initialize;

//# sourceMappingURL=initialize.js.map
