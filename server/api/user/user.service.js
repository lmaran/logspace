"use strict";
// import { mongoService } from "../../util/mongo.service";
var mongoService2 = require("../../util/mongo.service");
var mongoService = mongoService2.mongoService;
var collection = "users";
var service = {
    getAll: function (next) {
        mongoService.getDb(function (err, db) {
            // if (err) { return next(err, null); }
            db.collection(collection).find().toArray(function (err2, docs) {
                next(null, docs);
            });
        });
    },
    // ---------- CRUD ----------
    getById: function (id, next) {
        mongoService.getById(collection, id, next);
    },
};
exports.userService = service;

//# sourceMappingURL=user.service.js.map
