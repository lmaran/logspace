import * as _ from 'lodash'; // or import { extend } from 'lodash';
import mongoHelper from '../../data/mongoHelper';
import mongoService from '../../data/mongoService';
import * as crypto from 'crypto';

const collection = 'users';

const userService = {

    // ---------- OData ----------
    getAll: function(odataQuery, next) {
        let query = mongoService.getQuery(odataQuery);
        if (query.$sort === undefined) { query.$sort = { name: 1 }; } // sort by name (asc)

        query.$select = query.$select || {};

        _.extend(query.$select, { salt: 0, hashedPassword: 0 }); // exclude 'salt' and 'psw'     

        mongoService.getAll(collection, query, next);
    },

    // ---------- CRUD ----------
    getById: function (id, next) {
        mongoService.getById(collection, id, next);
    },

    create: function (user, next) {
        mongoService.create(collection, user, next);
    },

    update: function (user, next) {
        mongoService.update(collection, user, next);
    },

    updatePartial: function (user, next) { // replacing the entire object will delete the psw+salt
        mongoService.updatePartial(collection, user, next);
    },

    remove: function (id, next) {
        mongoService.remove(collection, id, next);
    },


    // ---------- RPC ----------    
    getByValue: function (field, value, id, next) {
        mongoService.getByValue(collection, field, value, id, next);
    },

    getByEmail: function (email, next) {
        mongoHelper.getDb(function (err, db) {
            if (err) { return next(err, null); }
            // db.collection('users').findOne({ email: email.toLowerCase() }, {salt:0, hashedPassword:0}, next);
            db.collection('users').findOne({ email: email.toLowerCase() }, next);  // exclude 'salt' and 'psw'                   
        });
    },

    getByIdWithoutPsw: function (id, next) {
        mongoHelper.getDb(function (err, db) {
            if (err) { return next(err, null); }
            id = mongoHelper.normalizedId(id);
            db.collection('users').findOne({ _id: id }, { salt: 0, hashedPassword: 0 }, next);  // exclude 'salt' and 'psw'
        });
    },

    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },

    encryptPassword: function (password, salt) {
        if (!password || !salt) { return ''; }
        let newSalt = new Buffer(salt, 'base64');
        return crypto.pbkdf2Sync(password, newSalt, 10000, 64).toString('base64');
    },

    authenticate: function (plainText, hashedPassword, salt) {
        return this.encryptPassword(plainText, salt) === hashedPassword;
    }

};

export default userService;

