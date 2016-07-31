"use strict";
var mongoHelper_1 = require("../../util/mongoHelper");
var service = {};
exports.userService = service;
var collection = "users";
service.getAll = function (next) {
    mongoHelper_1.default.getDb(function (err, db) {
        // if (err) { return next(err, null); }
        db.collection(collection).find().toArray(function (err2, docs) {
            next(null, docs);
        });
    });
    // let users = [{
    //     name: "lm"
    // }];
    // next(null, users);
};

//# sourceMappingURL=user.service.js.map
