"use strict";
var express_1 = require("express");
var users = require('./users');
var userRoutes = function (app) {
    var route = express_1.Router();
    // Mount route as "/users"
    app.use('/users', route);
    // route.get('/:username', function (req, res) {
    //     let user = users.getByUsername(req.params.username);
    //     res.json({data: user});
    // });
    route.get('/:username', users.getById);
};
exports.userRoutes = userRoutes;

//# sourceMappingURL=user-route.js.map
