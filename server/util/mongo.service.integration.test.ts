import { expect } from "chai";
import { mongoService } from "./mongo.service";
import * as proxyquire from "proxyquire";
// import { app } from "../server";
// import * as supertest from "supertest";
// let request = supertest(app);

let configStubErr = {
    default: {
        mongo: {
            uri: "mongodb://127.0.0.2"
        }
    }
};
let mongoServiceErr = proxyquire("./mongo.service", { "./../config/environment/index": configStubErr }).mongoService;

describe("Mongo service22", function () {
    it("should getById", function (done) {

        mongoService.getById("users", "5780eb7c9b711a3e2c1bc2d5", function(err, data){
            expect(err).to.be.null;

            data._id = data._id.toString(); // convert ObjectId to string
            expect(data).deep.equal({_id: "5780eb7c9b711a3e2c1bc2d5", name: "lm"});

            // err branch
            mongoServiceErr.getById("users", "5780eb7c9b711a3e2c1bc2d5", function (err2, data2) {
                expect(err2).to.be.not.null;
                done();
            });

        });
    });

});