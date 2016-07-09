"use strict";
var userService_1 = require('./userService');
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.getAll = function (req, res) {
        var odataQuery = req.query;
        odataQuery.hasCountSegment = req.url.indexOf('/$count') !== -1; // check for $count as a url segment
        userService_1.default.getAll(odataQuery, function (err, users) {
            var that = this;
            if (err) {
                return that._handleError(res, err);
            }
            res.status(200).json(users);
        });
    };
    ;
    UserController.prototype._handleError = function (res, err) {
        return res.status(500).send(err);
    };
    ;
    return UserController;
}());
exports.UserController = UserController;
