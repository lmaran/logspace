"use strict";
var environment_1 = require('./../config/environment');
(function (mongoHelper) {
    var mongodb = require('mongodb');
    var ObjectID = require('mongodb').ObjectID; // http://stackoverflow.com/a/24802198/2726725
    var theDb = null; // this will be re-used so the db is only created once (on first request).
    mongoHelper.getDb = function (next) {
        if (!theDb) {
            // connect to the db
            mongodb.MongoClient.connect(environment_1.default.mongo.uri, environment_1.default.mongo.options, function (err, db) {
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
    };
    mongoHelper.normalizedId = function (id) {
        if (ObjectID.isValid(id)) {
            return new ObjectID(id);
        }
        else {
            return id;
        }
    };
})(module.exports);
