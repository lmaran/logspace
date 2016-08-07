import { Request, Response } from "express";
// import { userController } from "./user.controller";
import * as proxyquire from "proxyquire";
// import * as sinon from "sinon";
import { expect } from "chai";

let httpMocks = require("node-mocks-http");

let userServiceStub = {};


// let userController = proxyquire("./user.controller", {
//     "./user.service": userServiceStub
// }).userController;

let req: Request;
let res: Response;

let userController;

describe("User Controller", function(){
    beforeEach(function() {

        // // use it if you only want to spy if "res.json" is calledOnce
        // req = {
        //     params: {
        //         id: "1"
        //     }
        // };

        req = httpMocks.createRequest({
            // method: 'GET',
            // url: '/user/42',
            params: {
                id: 123
            }
        });

        // use this if userServiceStub returns data synchronously
        res = httpMocks.createResponse();

        // // use a simple request if you don't want to test the result returned from spied service
        // res = {
        //     json: sinon.spy()
        // };

        // // use it if userServiceStub returns data async
        // res = httpMocks.createResponse({
        //     eventEmitter: require("events").EventEmitter
        // });

        userServiceStub = {
            userService: {
                getById: function (id, cb) {
                    cb(null, { name: "aaa_" + id });

                    // // if you want to simulate an async mode
                    // setTimeout(function(){
                    //     cb(null, { id: id, name: "aaa" });
                    // }, 1000);
                }
            }
        };
        userController = proxyquire("./user.controller", {
            "./user.service": userServiceStub
        }).userController;
    });

    it("should exist", function() {
        expect(userController).to.exist;
    });

    describe("getById", function() {
        it("should be defined", function() {
            expect(userController.getById).to.be.a("function");
        });

        it("should send json on successful retrieve", function(done) {
            userController.getById(req, res);

            // // use it if userServiceStub returns data async
            // res.on("end", function () {
            //     let data = JSON.parse( res._getData() );
            //     expect(data).deep.equal({id: 1, name: "aaa"});
            //     done();
            // });

            let data = JSON.parse( res._getData() );

            expect(data).deep.equal({name: "aaa_123"});
            expect(res.json).calledOnce;
            expect(res.statusCode).equal(200);

            done();
        });

        // it("should send json on successful retrieve", function() {
        //     userController.getById(req, res, function(err, user) {
        //         console.log(user);
        //     });
        // });
    });

});
