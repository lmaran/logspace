"use strict";
var home_routes_1 = require("./home.routes");
var chai_1 = require("chai");
var sinon = require("sinon");
var home_controller_1 = require("./home.controller");
describe("Home routes", function () {
    var app = {
        get: sinon.spy()
    };
    beforeEach(function () {
        home_routes_1.default(app);
    });
    it("/ -  should call the correct method in controller", function () {
        chai_1.expect(app.get.calledWith("/", home_controller_1.default.index)).to.be.true;
    });
});

//# sourceMappingURL=home.routes.test.js.map
