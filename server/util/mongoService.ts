import config from "./../config/environment";
import { MongoClient, ObjectID } from "mongodb";
// import { MongoClient } from "mongodb";

let theDb = null; // this will be re-used so the db is only created once (on first request).

const service  = {
    getDb: function (next) {
        if (!theDb) {
            // console.log(1);
            MongoClient.connect(config.mongo.uri, config.mongo.options, function (err, db) {
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
        } else { // db already exists...
            // console.log(2);
            next(null, theDb); // no error
        }
    },

    normalizedId: function (id) {
        // if (ObjectID.isValid(id)) {
            return new ObjectID(id);
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

export { service as mongoService };