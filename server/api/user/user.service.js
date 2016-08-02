"use strict";
var mongoService_1 = require("../../util/mongoService");
var collection = "users";
var service = {
    getAll: function (next) {
        mongoService_1.mongoService.getDb(function (err, db) {
            // if (err) { return next(err, null); }
            db.collection(collection).find().toArray(function (err2, docs) {
                next(null, docs);
            });
        });
    },
    // ---------- CRUD ----------
    getById: function (id, next) {
        mongoService_1.mongoService.getById(collection, id, next);
    },
};
exports.userService = service;

//# sourceMappingURL=user.service.js.map
