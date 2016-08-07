"use strict";
// import { userRouter } from "./user.routes";
var proxyquire = require("proxyquire");
var chai_1 = require("chai");
var httpMocks = require("node-mocks-http");
var req;
var res;
var userControllerStub = {};
var router;
describe("GET /user", function () {
    beforeEach(function () {
        req = httpMocks.createRequest({
            method: "GET",
            url: "/api/user/1",
            params: {
                id: 123
            }
        });
        res = httpMocks.createResponse();
        userControllerStub = {
            userController: {
                getById: function (req2, res2) {
                    res2.json({ name: "aaa" });
                    // // if you want to simulate an async mode
                    // setTimeout(function(){
                    //     cb(null, { id: id, name: "aaa" });
                    // }, 1000);
                }
            }
        };
        router = proxyquire("./user.routes", {
            "./user.controller": userControllerStub
        }).userRouter;
        // router.get("/:id", userController.getById);
    });
    it("should exist", function () {
        chai_1.expect(router).to.exist;
    });
    describe("getById", function () {
        it("should be defined", function (done) {
            // router.get("/api/user/1",  function(req2, res2) {
            //     let data = JSON.parse( res2._getData() );
            // });
            console.log(router.get("/api/user/1"));
            router.get("/api/user/1");
            done();
        });
    });
});

//# sourceMappingURL=user.routes.test.js.map
