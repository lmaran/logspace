"use strict";
var environment_1 = require("./../config/environment");
var mongodb_1 = require("mongodb");
// import { MongoClient } from "mongodb";
var theDb = null; // this will be re-used so the db is only created once (on first request).
var service = {
    getDb: function (next) {
        if (!theDb) {
            // console.log(1);
            mongodb_1.MongoClient.connect(environment_1.default.mongo.uri, environment_1.default.mongo.options, function (err, db) {
                // if (err) {
                //     next(err, null);
                // } else {
                //     theDb = db;
                //     next(null, db);
                // }
                // TODO: replace with above and coverages
                theDb = db;
                next(null, db);
            });
        }
        else {
            // console.log(2);
            next(null, theDb); // no error
        }
    },
    normalizedId: function (id) {
        // if (ObjectID.isValid(id)) {
        return new mongodb_1.ObjectID(id);
        // }
        // else { return id; }
    },
    // read
    getById: function (collection, id, next) {
        this.getDb(function (err, db) {
            // if (err) { return next(err, null); }
            id = service.normalizedId(id);
            db.collection(collection).findOne({ _id: id }, next);
        });
    },
};
exports.mongoService = service;

//# sourceMappingURL=mongoService.js.map
