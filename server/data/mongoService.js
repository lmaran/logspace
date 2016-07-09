"use strict";
var mongoHelper_1 = require('./mongoHelper');
var querystring = require('querystring');
var queryTransform_1 = require('./queryTransform');
var parser = require('odata-parser');
var mongoService = {
    getQuery: function (odataQuery) {
        var queryOptions = { $filter: {} };
        // lm: extract only odata parameters
        var fixedQS = {};
        if (odataQuery.$) {
            fixedQS.$ = odataQuery.$;
        }
        if (odataQuery.$expand) {
            fixedQS.$expand = odataQuery.$expand;
        }
        if (odataQuery.$filter) {
            fixedQS.$filter = odataQuery.$filter;
        }
        if (odataQuery.$format) {
            fixedQS.$format = odataQuery.$format;
        }
        if (odataQuery.$inlinecount) {
            fixedQS.$inlinecount = odataQuery.$inlinecount;
        } // only for compatibility. Use $count=true instead
        if (odataQuery.$select) {
            fixedQS.$select = odataQuery.$select;
        }
        if (odataQuery.$skip) {
            fixedQS.$skip = odataQuery.$skip;
        }
        if (odataQuery.$top) {
            fixedQS.$top = odataQuery.$top;
        }
        if (odataQuery.$orderby) {
            fixedQS.$orderby = odataQuery.$orderby;
        }
        if (Object.keys(fixedQS).length > 0) {
            var encodedQS = decodeURIComponent(querystring.stringify(fixedQS));
            if (encodedQS) {
                queryOptions = queryTransform_1.default(parser.parse(encodedQS));
            }
        }
        // count inline with '...&$inlinecount=allvalues' (odata V2) or '...&$count=true (odata V4)
        // added later because 'parse' does not recognize them
        if (odataQuery.$count) {
            queryOptions.$inlinecount = true;
        }
        if (odataQuery.hasCountSegment) {
            queryOptions.hasCountSegment = true;
        }
        // console.log('-----------------------------------------------------------------Initial query');
        // console.log(query);
        // console.log('-----------------------------------------------------------------Initial');
        // console.log(fixedQS);
        // console.log('-----------------------------------------------------------------Stringify');
        // console.log(querystring.stringify(fixedQS));
        // console.log('-----------------------------------------------------------------Decoded');
        // console.log(encodedQS);
        // console.log('-----------------------------------------------------------------Parsed');
        // console.log(JSON.stringify(parser.parse(encodedQS), null, 4));
        // console.log('-----------------------------------------------------------------Transformed');
        // console.log(queryOptions.$filter);
        return queryOptions;
    },
    getAll: function (collection, query, next) {
        // https://github.com/pofider/node-simple-odata-server/blob/master/lib/mongoAdapter.js
        mongoHelper_1.default.getDb(function (err, db) {
            if (err) {
                return next(err, null);
            }
            var qr = db.collection(collection).find(query.$filter, query.$select || {});
            if (query.$sort) {
                qr = qr.sort(query.$sort);
            }
            if (query.$skip) {
                qr = qr.skip(query.$skip);
            }
            if (query.$limit) {
                qr = qr.limit(query.$limit);
            }
            // count (by '/$count' url segment)     -> returns a Number
            if (query.hasCountSegment) {
                return qr.count(next);
            }
            // result                               -> returns an Array
            if (!query.$inlinecount) {
                return qr.toArray(next);
            }
            // count + result                       -> returns an Object
            qr.toArray(function (err2, res) {
                if (err2) {
                    return next(err2);
                }
                db.collection(collection).find(query.$filter).count(function (err3, c) {
                    if (err3) {
                        return next(err3);
                    }
                    next(null, {
                        count: c,
                        value: res
                    });
                });
            });
        });
    },
    getByValue: function (collection, field, value, id, next) {
        mongoHelper_1.default.getDb(function (err, db) {
            if (err) {
                return next(err, null);
            }
            // construct the query: http://stackoverflow.com/a/17039560/2726725
            var query = {};
            // escape special ch.: http://stackoverflow.com/a/8882749/2726725
            // add an "\" in front of each special ch. E.g.: . ? * + ^ $ ( ) [ ] | -         
            value = value.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
            // search case insensitive: https://xuguoming.wordpress.com/2015/02/11/using-variable-regex-with-mongodb-query-in-node-js/
            // the "start with" (^) character is important in order to hit the index"
            query[field] = new RegExp('^' + value + '$', 'i');
            // for update we have to exclude the existing document
            if (id) {
                query._id = { $ne: mongoHelper_1.default.normalizedId(id) };
            } // {name: /^John$/i, _id: {$ne:'93874502347652345'}}  
            db.collection(collection).findOne(query, next);
        });
    },
    // create
    create: function (collection, obj, next) {
        mongoHelper_1.default.getDb(function (err, db) {
            if (err) {
                return next(err, null);
            }
            db.collection(collection).insertOne(obj, next);
        });
    },
    // read
    getById: function (collection, id, next) {
        mongoHelper_1.default.getDb(function (err, db) {
            if (err) {
                return next(err, null);
            }
            id = mongoHelper_1.default.normalizedId(id);
            db.collection(collection).findOne({ _id: id }, next);
        });
    },
    // update
    update: function (collection, obj, next) {
        mongoHelper_1.default.getDb(function (err, db) {
            if (err) {
                return next(err, null);
            }
            obj._id = mongoHelper_1.default.normalizedId(obj._id);
            // returnOriginal: (default:true) Set to false if you want to return the modified object rather than the original
            db.collection(collection).findOneAndUpdate({ _id: obj._id }, obj, next);
        });
    },
    // updatePartial (use $set to update only specific fields)
    updatePartial: function (collection, obj, next) {
        mongoHelper_1.default.getDb(function (err, db) {
            if (err) {
                return next(err, null);
            }
            obj._id = mongoHelper_1.default.normalizedId(obj._id);
            // returnOriginal: (default:true) Set to false if you want to return the modified object rather than the original
            db.collection(collection).findOneAndUpdate({ _id: obj._id }, { $set: obj }, next);
        });
    },
    // delete
    remove: function (collection, id, next) {
        mongoHelper_1.default.getDb(function (err, db) {
            if (err) {
                return next(err, null);
            }
            id = mongoHelper_1.default.normalizedId(id);
            db.collection(collection).findOneAndDelete({ _id: id }, next);
        });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoService;
