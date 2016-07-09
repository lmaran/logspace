import config from './../config/environment';
import { MongoClient, ObjectID } from 'mongodb';

let theDb = null; // this will be re-used so the db is only created once (on first request).

const mongoHelper  = {
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
        if (ObjectID.isValid(id)) { return new ObjectID(id); }
        else { return id; }
    }
};

export default mongoHelper;
