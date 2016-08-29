import * as proxyquire from "proxyquire";
import * as supertest from "supertest";
import * as express from "express";
import { expect } from "chai";
import * as sinon from "sinon";

import userController from "./user.controller";

describe("GET /api/user", function () {
    let app, userControllerStub, request, route;

    beforeEach(function () {

        userControllerStub = {
            default: {
                getById: (req, res) => res.send("getById"),
                // getAll: (req, res) => res.send("getAll")
                getAll: sinon.spy()
            }
        };

        route = proxyquire("./user.routes", {
            "./user.controller": userControllerStub
        }).userRoutes;

        app = express();
        route(app);

        request = supertest(app);
    });

    it("/api/user/:id", function (done) {
        request
            .get("/api/user/123")
            .expect(200, "getById", done);

            // also ok
            // .expect(200, function (err, res) {
            //     expect(res.text).to.equal("getById");
            //     done();
            // });
    });

    // it("/api/user", function (done) {
    //     request
    //         .get("/api/user")
    //         .expect(200, "getAll", done);
    // });

    it("/api/user", function (done) {
            // expect(userControllerStub.default.getAll.calledWith("/", userController.getAll)).to.equal(true);
            console.log(userControllerStub.default.getAll);
            expect(userControllerStub.default.getAll.callCount).to.equal(true);
    });

});