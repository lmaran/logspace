import { mongoService } from "../../util/mongoService";
const collection = "users";

const service = {

    getAll: function (next) {
        mongoService.getDb(function (err, db) {
            // if (err) { return next(err, null); }

            db.collection(collection).find().toArray(function(err2, docs) {
                next(null, docs);
            });

        });
    },

    // ---------- CRUD ----------
    getById: function (id, next) {
        mongoService.getById(collection, id, next);
    },
};

export { service as userService };