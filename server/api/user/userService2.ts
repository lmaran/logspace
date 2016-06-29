const mongoService = require('../../data/mongoService');

import * as _ from 'lodash'; // or import { extend } from 'lodash';
const collection = 'users';

class UserService {
    // ---------- OData ----------
    getAll(odataQuery, next) {
        let query = mongoService.getQuery(odataQuery);
        if (query.$sort === undefined) { query.$sort = { name: 1 }; } // sort by name (asc)

        query.$select = query.$select || {};

        _.extend(query.$select, { salt: 0, hashedPassword: 0 }); // exclude 'salt' and 'psw'     

        mongoService.getAll(collection, query, next);
    };
}

// https://github.com/rogerpadilla/angular2-minimalist-starter/blob/6e5342d2b9f27b5ee232d9d037d7c3e4b2f83b0a/server/services/contact.service.ts
export const userService2 = new UserService();
