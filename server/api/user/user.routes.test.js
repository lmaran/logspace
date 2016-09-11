"use strict";
var user_routes_1 = require("./user.routes");
var chai_1 = require("chai");
var sinon = require("sinon");
var user_controller_1 = require("./user.controller");
describe("User routes", function () {
    var app = {
        get: sinon.spy(),
        post: sinon.spy(),
        delete: sinon.spy()
    };
    beforeEach(function () {
        user_routes_1.default(app);
    });
    it("/api/user/:id - should call the correct method in controller", function () {
        chai_1.expect(app.get.calledWith("/api/user/:id", user_controller_1.default.getById)).to.be.true;
    });
    it("/api/user - should call the correct method in controller", function () {
        chai_1.expect(app.get.calledWith("/api/user", user_controller_1.default.getAll)).to.be.true;
    });
});

//# sourceMappingURL=user.routes.test.js.map
