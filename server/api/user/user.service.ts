import { mongoService } from "../../util/mongo.service";
// let mongoService2 = require("../../util/mongo.service");
// let mongoService = mongoService2.mongoService;

const collection = "users";

const service = {

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
        mongoService.getById(collection, id, next);
    },
};

export { service as userService };