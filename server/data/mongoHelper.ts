import config from './../config/environment';
import { MongoClient, ObjectID } from 'mongodb';

(function (mongoHelper) {
    // const ObjectID = require('mongodb').ObjectID; // http://stackoverflow.com/a/24802198/2726725

    let theDb = null; // this will be re-used so the db is only created once (on first request).

    mongoHelper.getDb = function (next) { // the 'next' parameter is the callback function.
        if (!theDb) {
            // connect to the db
            MongoClient.connect(config.mongo.uri, config.mongo.options, function (err, db) {
                if (err) {
                    next(err, null);
                } else {
                    theDb = db;
                    next(null, db);
                }
            });
        } else { // db already exists...
            next(null, theDb); // no error              
        }
    };

    mongoHelper.normalizedId = function (id) {
        if (ObjectID.isValid(id)) { return new ObjectID(id); }
        else { return id; }
    };

})(module.exports);
