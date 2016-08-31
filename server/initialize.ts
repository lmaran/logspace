import allRoutes from "./routes";

let initialize = function(app){
    allRoutes(app);
    return app;
};

export default initialize;