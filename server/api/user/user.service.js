"use strict";
var service = {};
exports.userService = service;
// const collection = "user";
service.getAll = function (next) {
    // mongoHelper.getDb(function (err, db) {
    //     if (err) { return next(err, null); }
    //     db.collection(collection).find(next);
    // });
    var users = [{
            name: "lm"
        }];
    next(null, users);
};

//# sourceMappingURL=user.service.js.map
