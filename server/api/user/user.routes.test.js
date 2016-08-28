"use strict";
var proxyquire = require("proxyquire");
var supertest = require("supertest");
var express = require("express");
// import * as sinon from "sinon";
// import { expect } from "chai";
describe("GET /api/user", function () {
    var app, userControllerStub, request, route;
    beforeEach(function () {
        userControllerStub = {
            userController: {
                getById: function (req, res) { return res.send("getById"); },
                getAll: function (req, res) { return res.send("getAll"); }
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
        // ok, use it if need more details
        // .expect(200, function (err, res) {
        //     expect(res.text).to.equal("getById");
        //     done();
        // });
    });
    it("/api/user", function (done) {
        request
            .get("/api/user")
            .expect(200, "getAll", done);
    });
});

//# sourceMappingURL=user.routes.test.js.map
