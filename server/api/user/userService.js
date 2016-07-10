"use strict";
var _ = require("lodash"); // or import { extend } from "lodash";
var mongoHelper_1 = require("../../data/mongoHelper");
var mongoService_1 = require("../../data/mongoService");
var crypto = require("crypto");
var collection = "users";
var userService = {
    // ---------- OData ----------
    getAll: function (odataQuery, next) {
        var query = mongoService_1.default.getQuery(odataQuery);
        if (query.$sort === undefined) {
            query.$sort = { name: 1 };
        } // sort by name (asc)
        query.$select = query.$select || {};
        _.extend(query.$select, { salt: 0, hashedPassword: 0 }); // exclude "salt" and "psw"     
        mongoService_1.default.getAll(collection, query, next);
    },
    // ---------- CRUD ----------
    getById: function (id, next) {
        mongoService_1.default.getById(collection, id, next);
    },
    create: function (user, next) {
        mongoService_1.default.create(collection, user, next);
    },
    update: function (user, next) {
        mongoService_1.default.update(collection, user, next);
    },
    updatePartial: function (user, next) {
        mongoService_1.default.updatePartial(collection, user, next);
    },
    remove: function (id, next) {
        mongoService_1.default.remove(collection, id, next);
    },
    // ---------- RPC ----------    
    getByValue: function (field, value, id, next) {
        mongoService_1.default.getByValue(collection, field, value, id, next);
    },
    getByEmail: function (email, next) {
        mongoHelper_1.default.getDb(function (err, db) {
            if (err) {
                return next(err, null);
            }
            // db.collection("users").findOne({ email: email.toLowerCase() }, {salt:0, hashedPassword:0}, next);
            db.collection("users").findOne({ email: email.toLowerCase() }, next); // exclude "salt" and "psw"                   
        });
    },
    getByIdWithoutPsw: function (id, next) {
        mongoHelper_1.default.getDb(function (err, db) {
            if (err) {
                return next(err, null);
            }
            id = mongoHelper_1.default.normalizedId(id);
            db.collection("users").findOne({ _id: id }, { salt: 0, hashedPassword: 0 }, next); // exclude "salt" and "psw"
        });
    },
    makeSalt: function () {
        return crypto.randomBytes(16).toString("base64");
    },
    encryptPassword: function (password, salt) {
        if (!password || !salt) {
            return "";
        }
        var newSalt = new Buffer(salt, "base64");
        return crypto.pbkdf2Sync(password, newSalt, 10000, 64).toString("base64");
    },
    authenticate: function (plainText, hashedPassword, salt) {
        return this.encryptPassword(plainText, salt) === hashedPassword;
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userService;

//# sourceMappingURL=userService.js.map
