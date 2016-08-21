"use strict";
var index_1 = require("./../config/environment/index");
// let config = require("./../config/environment/index").default;
var mongodb_1 = require("mongodb");
var theDb = null; // this will be re-used so the db is only created once (on first request).
var service = {
    getDb: function (next) {
        if (!theDb) {
            console.log(999);
            console.log(index_1.default.mongo);
            mongodb_1.MongoClient.connect(index_1.default.mongo.uri, index_1.default.mongo.options, function (err, db) {
                if (err) {
                    next(err, null);
                }
                else {
                    theDb = db;
                    next(null, db);
                }
            });
        }
        else {
            console.log(9999);
            next(null, theDb); // no error
        }
    },
    normalizedId: function (id) {
        if (mongodb_1.ObjectID.isValid(id)) {
            return new mongodb_1.ObjectID(id);
        }
        else {
            return id;
        }
    },
    // read
    getById: function (collection, id, next) {
        console.log(666);
        this.getDb(function (err, db) {
            console.log(777);
            if (err) {
                return next(err, null);
            }
            console.log(888);
            id = service.normalizedId(id);
            console.log("id: " + id);
            db.collection(collection).findOne({ _id: id }, next);
        });
    }
};
exports.mongoService = service;

//# sourceMappingURL=mongo.service.js.map
