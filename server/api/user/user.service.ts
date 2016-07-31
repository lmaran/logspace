import mongoHelper from "../../util/mongoHelper";
let service: any = {};
const collection = "users";

service.getAll = function (next) {
    mongoHelper.getDb(function (err, db) {
        // if (err) { return next(err, null); }

        db.collection(collection).find().toArray(function(err2, docs) {
            next(null, docs);
        });

    });


    // let users = [{
    //     name: "lm"
    // }];

    // next(null, users);
};

export { service as userService };