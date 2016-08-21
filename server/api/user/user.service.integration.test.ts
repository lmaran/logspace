import { expect } from "chai";
// import { userService } from "./user.service";
import * as proxyquire from "proxyquire";
// import { app } from "../server";
// import * as supertest from "supertest";
// let request = supertest(app);

let configStub = {
    default: {
        mongo: {
            uri: "mongodb://localhost/logspace-dev"
        }
    }
};
let configStubErr = {
    default: {
        mongo: {
            uri: "mongodb://127.0.0.2/logspace-dev"
        }
    }
};

let userService = proxyquire("./user.service", { "./../config/environment": configStub}).userService;
let userServiceErr = proxyquire("./user.service", { "./../config/environment": configStubErr }).userService;

describe("User Service2", function () {
    it("should getById", function (done) {
        console.log(111);
        userService.getById("5780eb7c9b711a3e2c1bc2d5", function(err, data){
            console.log(222);
            expect(err).to.be.null;
            expect(data.name).equal("lm");
            done();
            console.log(333);
        });
    });

});