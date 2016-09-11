"use strict";
var sinon = require("sinon");
var chai_1 = require("chai");
var proxyquire, userRoutesStub, homeRoutesStub, app, routes;
var getRoutesModule = function () {
    routes = proxyquire("./routes", {
        "./api/user/user.routes": { default: userRoutesStub },
        "./api/home/home.routes": { default: homeRoutesStub }
    });
};
describe("Routes", function () {
    beforeEach(function () {
        proxyquire = require("proxyquire");
        app = {
            get: sinon.spy()
        };
        userRoutesStub = sinon.stub();
        homeRoutesStub = sinon.stub();
    });
    it("should call userRoutes", function () {
        getRoutesModule();
        routes.default(app); // a 'default' function is exported
        chai_1.expect(userRoutesStub.calledWith(app)).to.be.true;
    });
    it("should call homeRoutes", function () {
        getRoutesModule();
        routes.default(app); // a 'default' function is exported
        chai_1.expect(homeRoutesStub.calledWith(app)).to.be.true;
    });
});

//# sourceMappingURL=routes.test.js.map
