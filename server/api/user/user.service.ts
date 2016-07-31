
let service: any = {};
// const collection = "user";

service.getAll = function (next) {
    // mongoHelper.getDb(function (err, db) {
    //     if (err) { return next(err, null); }
    //     db.collection(collection).find(next);
    // });
    let users = [{
        name: "lm"
    }];

    next(null, users);
};

export { service as userService };