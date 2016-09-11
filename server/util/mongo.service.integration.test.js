"use strict";
var chai_1 = require("chai");
var mongo_service_1 = require("./mongo.service");
var proxyquire = require("proxyquire");
// import { app } from "../server";
// import * as supertest from "supertest";
// let request = supertest(app);
var configStubErr = {
    default: {
        mongo: {
            uri: "mongodb://127.0.0.2"
        }
    }
};
var mongoServiceErr = proxyquire("./mongo.service", { "./../config/environment/index": configStubErr }).mongoService;
describe("Mongo service - integration", function () {
    it("should getById", function (done) {
        mongo_service_1.mongoService.getById("users", "5780eb7c9b711a3e2c1bc2d5", function (err, data) {
            chai_1.expect(err).to.be.null;
            data._id = data._id.toString(); // convert ObjectId to string
            chai_1.expect(data).deep.equal({ _id: "5780eb7c9b711a3e2c1bc2d5", name: "lm" });
            // err branch
            mongoServiceErr.getById("users", "5780eb7c9b711a3e2c1bc2d5", function (err2, data2) {
                chai_1.expect(err2).to.be.not.null;
                done();
            });
        });
    });
});

//# sourceMappingURL=mongo.service.integration.test.js.map
