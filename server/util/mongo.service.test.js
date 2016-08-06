"use strict";
var chai_1 = require("chai");
var proxyquire = require("proxyquire");
describe("Mongo service", function () {
    it("should respond with an error object (for incorrect uri)", function (done) {
        var configStubErr = {
            default: {
                mongo: {
                    uri: "mongodb://fakehost"
                }
            }
        };
        var mongoService = proxyquire("./mongo.service", { "./../config/environment": configStubErr }).mongoService;
        mongoService.getDb(function (err, db) {
            chai_1.expect(err).to.be.not.null;
            chai_1.expect(err.name).equal("MongoError");
            chai_1.expect(err.message).equal("getaddrinfo ENOTFOUND fakehost fakehost:27017");
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
        var mongoService = proxyquire("./mongo.service", { "./../config/environment": configStubOk }).mongoService;
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
});

//# sourceMappingURL=mongo.service.test.js.map
