"use strict";
var chai_1 = require("chai");
var user_service_1 = require("./user.service");
// import * as proxyquire from "proxyquire";
// import { app } from "../server";
// import * as supertest from "supertest";
// let request = supertest(app);
// let configStub = {
//     default: {
//         mongo: {
//             uri: "mongodb://localhost/logspace-dev"
//         }
//     }
// };
// let configStubErr = {
//     default: {
//         mongo: {
//             uri: "mongodb://localhost2/logspace-dev"
//         }
//     }
// };
// let userService = proxyquire("./user.service", { "./../config/environment": configStub}).userService;
// let userServiceErr = proxyquire("./user.service", { "./../config/environment": configStubErr }).userService;
describe("User Service", function () {
    it("should getById", function (done) {
        user_service_1.userService.getById("5780eb7c9b711a3e2c1bc2d5", function (err, data) {
            chai_1.expect(err).to.be.null;
            chai_1.expect(data.name).equal("lm");
            done();
        });
    });
});

//# sourceMappingURL=user.service.integration.test.js.map
