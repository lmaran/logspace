"use strict";
var mongo_service_1 = require("../../util/mongo.service");
// let mongoService2 = require("../../util/mongo.service");
// let mongoService = mongoService2.mongoService;
var collection = "users";
var service = {
    // getAll: function (next) {
    //     mongoService.getDb(function (err, db) {
    //         // if (err) { return next(err, null); }
    //         db.collection(collection).find().toArray(function(err2, docs) {
    //             next(null, docs);
    //         });
    //     });
    // },
    // ---------- CRUD ----------
    getById: function (id, next) {
        // console.log(555);
        mongo_service_1.mongoService.getById(collection, id, next);
    },
};
exports.userService = service;

//# sourceMappingURL=user.service.js.map
