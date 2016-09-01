import allRoutes from "./routes";
import config from "./config/environment";

const exphbs = require("express-handlebars");

let initialize = function(app){

    app.set("views", config.root + "/server/views");

    app.engine(".hbs", exphbs({
        defaultLayout: "main",
        extname: ".hbs",
        // in the feature we probably don"t need the next 2 lines
        // https://github.com/ericf/express-handlebars/issues/147#issuecomment-159737839
        layoutsDir: config.root + "/server/views/layouts/",
        partialsDir: config.root + "/server/views/partials/",

        // ensure the javascript is at the bottom of the code in express-handlebars template
        // http://stackoverflow.com/a/25307270
        // helpers: {
        //     section: function(name, options){
        //         if (!this._sections) { this._sections = {}; };
        //         this._sections[name] = options.fn(this);
        //         return null;
        //     }
        // }
    }));

    app.set("view engine", ".hbs");

    allRoutes(app);
    return app;
};

export default initialize;