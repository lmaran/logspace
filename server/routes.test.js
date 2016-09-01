"use strict";
var sinon = require("sinon");
var chai_1 = require("chai");
var proxyquire, userRoutesStub, app, routes;
var getRoutesModule = function () {
    routes = proxyquire("./routes", {
        "./api/user/user.routes": { default: userRoutesStub }
    });
};
describe("Routes", function () {
    beforeEach(function () {
        proxyquire = require("proxyquire");
        app = {
            get: sinon.spy()
        };
        userRoutesStub = sinon.stub();
    });
    describe("Bootstrapping", function () {
        it("should call userRoutes", function () {
            getRoutesModule();
            routes.default(app); // a 'default' function is exported
            chai_1.expect(userRoutesStub.calledWith(app)).to.be.true;
        });
        it("should handle /", function () {
            getRoutesModule();
            routes.default(app); // a 'default' function is exported
            // expect(userRoutesStub.calledWith(app)).to.be.true;
            // expect(app.get).to.be.calledWith("/", home.index);
        });
    });
});

//# sourceMappingURL=routes.test.js.map
