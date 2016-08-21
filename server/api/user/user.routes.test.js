"use strict";
var proxyquire = require("proxyquire");
var supertest = require("supertest");
var chai_1 = require("chai");
var express = require("express");
describe("GET /api/user", function () {
    var app, userControllerStub, request, route;
    // proxyquire.noPreserveCache();
    beforeEach(function () {
        // A stub we can use to control conditionals
        var userControllerStub4 = {
            userController: {
                getById: function (req, res) {
                    res.json({ name: "aaa" });
                }
            }
        };
        // userControllerStub3(userControllerStub3);
        // userControllerStub = sinon.stub();
        // userControllerStub.returns(userControllerStub4);
        userControllerStub = {
            userController: {
                getById: function (req, res) {
                    res.json({ name: "aaa" });
                }
            }
        };
        // userControllerStub = {
        //     getById: function (req, res) {
        //         res.json({name: "aaa"});
        //     }
        // };
        // Create an express application object
        app = express();
        // Get our router module, with a stubbed out users dependency
        // we stub this out so we can control the results returned by
        // the users module to ensure we execute all paths in our code
        // route = proxyquire("./user.routes", {
        //     "./user.controller": userControllerStub
        // }).userRoutes;
        route = proxyquire("./user.routes", {
            "./user.controller": userControllerStub
        }).userRoutes;
        // Bind a route to our application
        route(app);
        // Get a supertest instance so we can make requests
        request = supertest(app);
    });
    // afterEach(function () {
    //     userControllerStub.restore();
    // });
    it("should respond with 200 and a user object", function (done) {
        // let userControllerStub2 = {
        //     userController: {
        //         getById: function (req, res) {
        //             res.json({name: "aaa"});
        //         }
        //     }
        // };
        //userControllerStub.yields(userControllerStub2);
        console.log(userControllerStub);
        // userControllerStub.yields(userControllerStub2);
        request
            .get("/api/user/5780eb7c9b711a3e2c1bc2d5")
            .expect("Content-Type", /json/)
            .expect(200, function (err, res) {
            console.log(res.body);
            chai_1.expect(res.body).to.deep.equal({
                name: "aaa"
            });
            done();
        });
    });
});
// import { app } from "../../server";
// // import { Request, Response } from "express";
// // var sinon = require('sinon');
// import * as sinon from "sinon";
// // import { userRouter } from "./user.routes";
// import * as proxyquire from "proxyquire";
// import { expect } from "chai";
// import * as supertest from "supertest";
// describe("User Router", function () {
//     // var app, getUserStub, request, route;
//     let router;
//     // let userControllerStub: any = {};
//     let request;
//     beforeEach(function () {
//         // A stub we can use to control conditionals
//         // getUserStub = sinon.stub();
//         // userControllerStub = sinon.stub();
//         // userControllerStub = {
//         //     userController: {
//         //         getById: function (req, res) {
//         //             res.json({name: "aaa"});
//         //         }
//         //     }
//         // };
//         // userControllerStub.userController = {};
//         // userControllerStub.userController.getById = function(req, res){
//         //     console.log(22);
//         // };
//         // Create an express application object
//         // app = express();
//         // Get our router module, with a stubbed out users dependency
//         // we stub this out so we can control the results returned by
//         // the users module to ensure we execute all paths in our code
//         // route = proxyquire('../lib/user-route.js', {
//         //   './users': {
//         //     getByUsername: getUserStub
//         //   }
//         // });
//         // router = proxyquire("./user.routes", {
//         //     "./user.controller": userControllerStub
//         // }).userRouter;
//         // router = require("./user.routes").userRouter;
//         // // Bind our application to
//         // route(app);
//         // Get a supertest instance so we can make requests
//         // request = supertest(app);
//     });
//     //   it('should respond with a 404 and a null', function (done) {
//     //     getUserStub.returns(null);
//     //     request
//     //       .get('/users/nodejs')
//     //       .expect('Content-Type', /json/)
//     //       .expect(404, function (err, res) {
//     //         expect(res.body).to.deep.equal({
//     //           status: 'not ok',
//     //           data: null
//     //         });
//     //         done();
//     //       });
//     //   });
//     // it("should respond with 200 and a user object", function (done) {
//     //     let userControllerStub = {
//     //         userController: {
//     //             getById: function (req, res) {
//     //                 res.json({ name: "aaa" });
//     //             }
//     //         }
//     //     };
//     //     router = proxyquire("./user.routes", {
//     //         "./user.controller": userControllerStub
//     //     }).userRouter;
//     //     request = supertest(app);
//     //     // userControllerStub.returns(userData);
//     //     request
//     //         .get("/api/user/5780eb7c9b711a3e2c1bc2d5")
//     //         .expect("Content-Type", /json/)
//     //         // .expect({ _id: "5780eb7c9b711a3e2c1bc2d5", name: "lm" }, done);
//     //         .expect(200, function (err, res) {
//     //             // if (err) { return done(err); }
//     //             expect(res.body.name).equal("lm");
//     //             done();
//     //         });
//     // });
// });
// // // import { app } from "../../server";
// // import { Request, Response } from "express";
// // // import { userRouter } from "./user.routes";
// // import * as proxyquire from "proxyquire";
// // import { expect } from "chai";
// // let httpMocks = require("node-mocks-http");
// // let req: Request;
// // let res: Response;
// // let userControllerStub = {};
// // let router;
// // describe("GET /user", function () {
// //     beforeEach(function() {
// //         req = httpMocks.createRequest({
// //             method: "GET",
// //             url: "/api/user/1",
// //             params: {
// //                 id: 123
// //             }
// //         });
// //         res = httpMocks.createResponse();
// //         userControllerStub = {
// //             userController: {
// //                 getById: function (req2, res2) {
// //                      res2.json({name: "aaa"});
// //                     // // if you want to simulate an async mode
// //                     // setTimeout(function(){
// //                     //     cb(null, { id: id, name: "aaa" });
// //                     // }, 1000);
// //                 }
// //             }
// //         };
// //         router = proxyquire("./user.routes", {
// //             "./user.controller": userControllerStub
// //         }).userRouter;
// //         // router.get("/:id", userController.getById);
// //     });
// //     it("should exist", function () {
// //         expect(router).to.exist;
// //     });
// //     describe("getById", function() {
// //         it("should be defined", function(done) {
// //             // router.get("/api/user/1",  function(req2, res2) {
// //             //     let data = JSON.parse( res2._getData() );
// //             // });
// //             // console.log(router.get("/api/user/1"));
// //             router.get("/api/user/1");
// //             done();
// //         });
// //     });
// // }); 

//# sourceMappingURL=user.routes.test.js.map
