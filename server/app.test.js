"use strict";
var sinon = require("sinon");
var chai_1 = require("chai");
var proxyquire, expressStub, configStub, app, logSpy;
var server = function () {
    proxyquire("./app", {
        "express": expressStub,
        "./initialize": { default: configStub }
    });
};
describe("Server", function () {
    beforeEach(function () {
        proxyquire = require("proxyquire");
        app = {
            set: sinon.spy(),
            get: sinon.stub().returns(3300),
            listen: sinon.spy()
        };
        expressStub = sinon.stub().returns(app);
        configStub = sinon.stub().returns(app);
        // delete process.env.PORT;
    });
    afterEach(function () {
        // spy.restore();
    });
    describe("Bootstrapping", function () {
        it("should create the app", function () {
            server();
            // console.log(expressStub.callCount);
            chai_1.expect(expressStub.called).to.be.true;
        });
        // it("should set the views", function(){
        //     server();
        //     expect(app.set.secondCall.args[0]).to.equal("views");
        // });
        it("should configure the app", function () {
            server();
            // console.log(configStub.callCount);
            chai_1.expect(configStub.calledWith(app)).to.be.true;
        });
        // it("should connect with mongoose", function(){
        //     server();
        //     expect(mongooseStub.connect).to.be.calledWith(sinon.match.string);
        // });
        it("should launch the app", function () {
            server();
            // expect(app.get).to.be.calledWith("port");
            console.log(app.listen.callCount);
            // console.log(app.listen.firstCall.args);
            chai_1.expect(app.listen.calledWith("1410", sinon.match.func)).to.be.true; // todo, "1410" is not the expected value
        });
        it("should call console.log", function () {
            logSpy = sinon.spy(console, "log");
            server();
            var listedCallback = app.listen.firstCall.args[1];
            listedCallback();
            chai_1.expect(logSpy.called).to.be.true;
        });
    });
    // describe("Port", function(){
    //     it("should be set", function() {
    //         server();
    //         expect(app.set.firstCall.args[0]).to.equal("port");
    //     });
    //     it("should default to 3300", function() {
    //         server();
    //         expect(app.set.firstCall.args[1]).to.equal(3300);
    //     });
    //     it("should be configurable", function() {
    //         process.env.PORT = "5500";
    //         server();
    //         expect(app.set.firstCall.args[1]).to.equal("5500");
    //     });
    // });
});

//# sourceMappingURL=app.test.js.map
