import { app } from "../../server";
import { Request, Response } from "express";
// import { userRouter } from "./user.routes";
import * as proxyquire from "proxyquire";
import { expect } from "chai";
let httpMocks = require("node-mocks-http");

let req: Request;
let res: Response;

let userControllerStub = {};
let router;

describe("GET /user", function () {

    beforeEach(function() {

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
                     res2.json({name: "aaa"});

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
        expect(router).to.exist;
    });

    describe("getById", function() {
        it("should be defined", function(done) {
            // router.get("/api/user/1",  function(req2, res2) {
            //     let data = JSON.parse( res2._getData() );
            // });

            // console.log(router.get("/api/user/1"));

            router.get("/api/user/1");

            done();
        });
    });

});