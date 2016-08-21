"use strict";
var chai_1 = require("chai");
// import { userService } from "./user.service";
var proxyquire = require("proxyquire");
// import { app } from "../server";
// import * as supertest from "supertest";
// let request = supertest(app);
var configStub = {
    default: {
        mongo: {
            uri: "mongodb://localhost/logspace-dev"
        }
    }
};
var configStubErr = {
    default: {
        mongo: {
            uri: "mongodb://127.0.0.2/logspace-dev"
        }
    }
};
var userService = proxyquire("./user.service", { "./../config/environment": configStub }).userService;
var userServiceErr = proxyquire("./user.service", { "./../config/environment": configStubErr }).userService;
describe("User Service2", function () {
    it("should getById", function (done) {
        console.log(111);
        userService.getById("5780eb7c9b711a3e2c1bc2d5", function (err, data) {
            console.log(222);
            chai_1.expect(err).to.be.null;
            chai_1.expect(data.name).equal("lm");
            done();
            console.log(333);
        });
    });
});

//# sourceMappingURL=user.service.integration.test.js.map
