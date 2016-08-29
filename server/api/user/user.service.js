"use strict";
var mongo_service_1 = require("../../util/mongo.service");
var collection = "users";
var userService = {
    getAll: function (next) {
        mongo_service_1.mongoService.getDb(function (err, db) {
            // if (err) { return next(err, null); }
            db.collection(collection).find().toArray(function (err2, docs) {
                next(null, docs);
            });
        });
    },
    // ---------- CRUD ----------
    getById: function (id, next) {
        // console.log(555);
        mongo_service_1.mongoService.getById(collection, id, next);
    },
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userService;

//# sourceMappingURL=user.service.js.map
