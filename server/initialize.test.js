"use strict";
var sinon = require("sinon");
var chai_1 = require("chai");
var proxyquire, routesStub, app, initialize;
var getInitializeModule = function () {
    initialize = proxyquire("./initialize", {
        "./routes": { default: routesStub }
    });
};
describe("Initialize", function () {
    beforeEach(function () {
        proxyquire = require("proxyquire");
        app = {};
        routesStub = sinon.stub();
    });
    describe("Bootstrapping", function () {
        it("should call routes", function () {
            getInitializeModule();
            initialize.default(app); // a 'default' function is exported
            chai_1.expect(routesStub.calledWith(app)).to.be.true;
        });
    });
});

//# sourceMappingURL=initialize.test.js.map
