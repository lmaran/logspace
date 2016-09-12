"use strict";
var admin_routes_1 = require("./admin.routes");
var chai_1 = require("chai");
var sinon = require("sinon");
var admin_controller_1 = require("./admin.controller");
describe("admin routes", function () {
    var app = {
        get: sinon.spy()
    };
    beforeEach(function () {
        admin_routes_1.default(app);
    });
    it("/ -  should call the correct method in controller", function () {
        chai_1.expect(app.get.calledWith("/admin|/admin/*", admin_controller_1.default.index)).to.be.true;
    });
});

//# sourceMappingURL=admin.routes.test.js.map
