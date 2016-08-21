"use strict";
var chai_1 = require("chai");
var proxyquire = require("proxyquire");
var mongodb_1 = require("mongodb");
describe("Mongo service", function () {
    it("should respond with an error object (for incorrect uri)", function (done) {
        var configStubErr = {
            default: {
                mongo: {
                    uri: "mongodb://127.0.0.2"
                }
            }
        };
        var mongoService = proxyquire("./mongo.service", { "./../config/environment/index": configStubErr }).mongoService;
        mongoService.getDb(function (err, db) {
            chai_1.expect(err).to.be.not.null;
            chai_1.expect(err).to.be.not.null;
            chai_1.expect(err.name).equal("MongoError");
            chai_1.expect(err.message).equal("connect ECONNREFUSED 127.0.0.2:27017");
            done();
        });
    });
    it("should respond with a cached DB instance (for correct uri)", function (done) {
        var configStubOk = {
            default: {
                mongo: {
                    uri: "mongodb://localhost/logspace-dev"
                }
            }
        };
        var mongoService = proxyquire("./mongo.service", { "./../config/environment/index": configStubOk }).mongoService;
        mongoService.getDb(function (err, db1) {
            chai_1.expect(err).to.be.null;
            chai_1.expect(db1.databaseName).equal("logspace-dev");
            // check if the response from second request comes from cache
            mongoService.getDb(function (err2, db2) {
                chai_1.expect(db2).equal(db1);
                done();
            });
        });
    });
    it("should return a correct normalized value", function () {
        var mongoService = proxyquire("./mongo.service", { "./../config/environment": {} }).mongoService;
        // check for valid ObjectID
        chai_1.expect(mongoService.normalizedId("5780eb7c9b711a3e2c1bc2d5")).deep.equal(new mongodb_1.ObjectID("5780eb7c9b711a3e2c1bc2d5"));
        // check for invalid ObjectID
        chai_1.expect(mongoService.normalizedId("aaa")).equal("aaa");
    });
});

//# sourceMappingURL=mongo.service.test.js.map
