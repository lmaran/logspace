"use strict";
var environment_1 = require("./../config/environment");
var mongodb_1 = require("mongodb");
var theDb = null; // this will be re-used so the db is only created once (on first request).
var mongoHelper = {
    getDb: function (next) {
        if (!theDb) {
            mongodb_1.MongoClient.connect(environment_1.default.mongo.uri, environment_1.default.mongo.options, function (err, db) {
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
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoHelper;

//# sourceMappingURL=mongoHelper.js.map
