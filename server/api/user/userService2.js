"use strict";
var mongoService = require('../../data/mongoService');
var _ = require('lodash'); // or import { extend } from 'lodash';
var collection = 'users';
var UserService = (function () {
    function UserService() {
    }
    // ---------- OData ----------
    UserService.prototype.getAll = function (odataQuery, next) {
        var query = mongoService.getQuery(odataQuery);
        if (query.$sort === undefined) {
            query.$sort = { name: 1 };
        } // sort by name (asc)
        query.$select = query.$select || {};
        _.extend(query.$select, { salt: 0, hashedPassword: 0 }); // exclude 'salt' and 'psw'     
        mongoService.getAll(collection, query, next);
    };
    ;
    return UserService;
}());
// https://github.com/rogerpadilla/angular2-minimalist-starter/blob/6e5342d2b9f27b5ee232d9d037d7c3e4b2f83b0a/server/services/contact.service.ts
exports.userService2 = new UserService();
