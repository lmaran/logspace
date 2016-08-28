import config from "./../config/environment/index";
// let config = require("./../config/environment/index").default;
import { MongoClient, ObjectID } from "mongodb";

let theDb = null; // this will be re-used so the db is only created once (on first request).
const service  = {
    getDb: function (next) {
        if (!theDb) {
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
    },

    normalizedId: function (id) {
        if (ObjectID.isValid(id)) {
            return new ObjectID(id);
        }
        else { return id; }
    },

    // read
    getById: function (collection, id, next) {
        this.getDb(function (err, db) {
            if (err) { return next(err, null); }
            id = service.normalizedId(id);
            db.collection(collection).findOne({ _id: id }, next);
        });
    }

    // config: config

};

export { service as mongoService };