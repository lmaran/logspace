import { expect } from "chai";
import * as proxyquire from "proxyquire";

describe("Mongo service", function () {
    it("should respond with an error object (for incorrect uri)", function (done) {
        let configStubErr = {
            default: {
                mongo: {
                    uri: "mongodb://fakehost"
                }
            }
        };

        let mongoService = proxyquire("./mongo.service", { "./../config/environment": configStubErr }).mongoService;

        mongoService.getDb(function (err, db) {
            expect(err).to.be.not.null;
            expect(err.name).equal("MongoError");
            expect(err.message).equal("getaddrinfo ENOTFOUND fakehost fakehost:27017");
            done();
        });
    });

    it("should respond with a cached DB instance (for correct uri)", function (done) {
        let configStubOk = {
            default: {
                mongo: {
                    uri: "mongodb://localhost/logspace-dev"
                }
            }
        };

        let mongoService = proxyquire("./mongo.service", { "./../config/environment": configStubOk }).mongoService;

        mongoService.getDb(function (err, db1) {
            expect(err).to.be.null;
            expect(db1.databaseName).equal("logspace-dev");

            // check if the response from second request comes from cache
            mongoService.getDb(function (err2, db2) {
                expect(db2).equal(db1);
                done();
            });

        });

    });

});