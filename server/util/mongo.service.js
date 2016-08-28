"use strict";
var index_1 = require("./../config/environment/index");
// let config = require("./../config/environment/index").default;
var mongodb_1 = require("mongodb");
var theDb = null; // this will be re-used so the db is only created once (on first request).
var service = {
    getDb: function (next) {
        if (!theDb) {
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
        this.getDb(function (err, db) {
            if (err) {
                return next(err, null);
            }
            id = service.normalizedId(id);
            db.collection(collection).findOne({ _id: id }, next);
        });
    }
};
exports.mongoService = service;

//# sourceMappingURL=mongo.service.js.map
