"use strict";
var proxyquire = require("proxyquire");
var sinon = require("sinon");
var supertest = require("supertest");
var chai_1 = require("chai");
var express = require("express");
describe("GET /api/user", function () {
    var app, userControllerStub, request, route;
    // proxyquire.noPreserveCache();
    var getByIdSpy, userControllerStub2;
    var f, ff;
    beforeEach(function () {
        userControllerStub2 = sinon.stub();
        // userControllerStub.returns(userControllerStub4);
        // userControllerStub = {
        //     userController: {
        //         getById: function (req, res) {
        //             res.json({name: "aaa"});
        //         },
        //         getAll: function (req, res) {
        //             res.json([{name: "bbb"}]);
        //         }
        //     }
        // };
        // getByIdStub.withArgs({}, {}).calls(function (req, res) {
        //     res.send('mock result 1');
        // });
        // getByIdSpy = sinon.spy();
        f = function (req, res) {
            res.json({ name: "aaa" });
        };
        ff = function () {
            return "aaa";
        };
        // console.log(typeof getByIdStub);
        userControllerStub = {
            userController: {
                getById: f,
                // getById: getByIdSpy,
                // getById: (req, res) => res.end(),
                getAll: function (req, res) { return res.end(); },
            }
        };
        getByIdSpy = sinon.spy(ff);
        var x = ff();
        console.log(x);
        console.log(getByIdSpy.callCount);
        // sinon.spy(userControllerStub.userController, "getById");
        // userControllerStub = {
        //     userController: userControllerStub2
        // };
        app = express();
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
        // console.log(typeof getByIdStub.returns);
        // getByIdStub.onFirstCall().returns({name: "aaa"});
        // userControllerStub2.yieldsTo("getById", {name: "aaa"});
        // request
        //     .get("/api/user/5780eb7c9b711a3e2c1bc2d5")
        //     .expect("Content-Type", /json/)
        //     .expect(200, function (err, res) {
        //         expect(res.body).to.deep.equal({
        //             name: "aaa"
        //         });
        //         done();
        //     });
        // request.get("/api/user/5780eb7c9b711a3e2c1bc2d5").expect(200, done);
        request.get("/api/user/12");
        // expect(getByIdSpy.calledOnce).to.equal(true);
        // expect(true).to.equal(true);
        var r, s;
        r = s = {};
        s.json = sinon.spy();
        f(r, s);
        console.log(getByIdSpy.callCount);
        chai_1.expect(getByIdSpy.called).to.equal(true);
        done();
    });
    // it("should respond with 200 and a user array", function (done) {
    //     // console.log(userControllerStub);
    //     request
    //         .get("/api/user")
    //         .expect("Content-Type", /json/)
    //         .expect(200, function (err, res) {
    //             console.log(res.body);
    //             expect(res.body).to.deep.equal([{
    //                 name: "bbb"
    //             }]);
    //             done();
    //         });
    // });
});
// ***********************************
// import * as proxyquire from "proxyquire";
// import * as sinon from "sinon";
// import * as supertest from "supertest";
// import { expect } from "chai";
// import * as express from "express";
// import { Request, Response } from "express";
// let httpMocks = require("node-mocks-http");
// let route;
// // route = proxyquire("./user.routes", {
// //     "./user.controller": userControllerStub
// // }).userRoutes;
// route = require("./user.routes").userRoutes;
// // let req: Request;
// // let res = {json: {}};
// // let res: Response;
// // let spy;
// import { userController } from "./user.controller";
// describe("Routes", function() {
//     describe("GET Users", function() {
//         it("should respond", function() {
//             let app = express();
//             //route(app);
//             //   // let req: Request, res: Response, spy;
//             //   // req = res = {};
//             //   // res = {};
//             //   req = httpMocks.createRequest({
//             //       method: "GET",
//             //       url: "/api/user/123",
//             //       params: {
//             //           id: 123
//             //       }
//             //   });
//             //   res = {
//             //       json: sinon.spy()
//             //   };
//             //   // res = httpMocks.createResponse();
//             let req, res, spy;
//             req = res = {};
//             spy = res.json = sinon.spy();
//             userController.getAll(req, res, null);
//             console.log(res.body);
//             expect(res.json.calledOnce).to.equal(true);
//         });
//         it("should respond", function () {
//             let app = express();
//             route(app);
//             let req, res, spy;
//             req = res = {};
//             req.params = {id: "123" };
//             spy = res.json = sinon.spy();
//             userController.getById(req, res, null);
//             console.log(res.body);
//             expect(res.json.calledOnce).to.equal(true);
//         });
//     });
// });
// *****************************************************************
// import * as proxyquire from "proxyquire";
// import * as sinon from "sinon";
// import * as supertest from "supertest";
// import { expect } from "chai";
// import * as express from "express";
// describe("GET /api/user", function () {
//     let app, userControllerStub, request, route;
//     // proxyquire.noPreserveCache();
//     beforeEach(function () {
//         // A stub we can use to control conditionals
//         let userControllerStub4 = {
//             userController: {
//                 getById: function (req, res) {
//                     res.json({name: "aaa"});
//                 }
//             }
//         };
//         // userControllerStub3(userControllerStub3);
//         // userControllerStub = sinon.stub();
//         // userControllerStub.returns(userControllerStub4);
//         userControllerStub = {
//             userController: {
//                 getById: function (req, res) {
//                     res.json({name: "aaa"});
//                 }
//             }
//         };
//         // userControllerStub = {
//         //     getById: function (req, res) {
//         //         res.json({name: "aaa"});
//         //     }
//         // };
//         // Create an express application object
//         app = express();
//         // Get our router module, with a stubbed out users dependency
//         // we stub this out so we can control the results returned by
//         // the users module to ensure we execute all paths in our code
//         // route = proxyquire("./user.routes", {
//         //     "./user.controller": userControllerStub
//         // }).userRoutes;
//         route = proxyquire("./user.routes", {
//             "./user.controller": userControllerStub
//         }).userRoutes;
//         // Bind a route to our application
//         route(app);
//         // Get a supertest instance so we can make requests
//         request = supertest(app);
//     });
//     // afterEach(function () {
//     //     userControllerStub.restore();
//     // });
//     it("should respond with 200 and a user object", function (done) {
//         // let userControllerStub2 = {
//         //     userController: {
//         //         getById: function (req, res) {
//         //             res.json({name: "aaa"});
//         //         }
//         //     }
//         // };
//         //userControllerStub.yields(userControllerStub2);
//         console.log(userControllerStub);
//         // userControllerStub.yields(userControllerStub2);
//         request
//             .get("/api/user/5780eb7c9b711a3e2c1bc2d5")
//             .expect("Content-Type", /json/)
//             .expect(200, function (err, res) {
//                 console.log(res.body);
//                 expect(res.body).to.deep.equal({
//                     name: "aaa"
//                 });
//                 done();
//             });
//     });
// });
// *****************************************************************
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
