"use strict";
var sinon = require("sinon");
var chai_1 = require("chai");
var proxyquire, app, routes;
var userRoutesStub, homeRoutesStub, adminRoutesStub;
var getRoutesModule = function () {
    routes = proxyquire("./routes", {
        "./api/user/user.routes": { default: userRoutesStub },
        "./api/home/home.routes": { default: homeRoutesStub },
        "./api/admin/admin.routes": { default: adminRoutesStub }
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
        adminRoutesStub = sinon.stub();
    });
    it("should call userRoutes", function () {
        getRoutesModule();
        routes.default(app); // a 'default' function is exported
        chai_1.expect(userRoutesStub.calledWith(app)).to.be.true;
    });
    it("should call homeRoutes", function () {
        getRoutesModule();
        routes.default(app);
        chai_1.expect(homeRoutesStub.calledWith(app)).to.be.true;
    });
    it("should call adminRoutes", function () {
        getRoutesModule();
        routes.default(app);
        chai_1.expect(adminRoutesStub.calledWith(app)).to.be.true;
    });
});

//# sourceMappingURL=routes.test.js.map
