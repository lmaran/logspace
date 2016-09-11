"use strict";
var home_controller_1 = require("./home.controller");
var sinon = require("sinon");
var chai_1 = require("chai");
var req = {};
var res = {};
describe("Home Controller", function () {
    describe("Index", function () {
        beforeEach(function () {
            res = {
                render: sinon.spy(),
                send: sinon.spy()
            };
        });
        it("should be defined", function () {
            chai_1.expect(home_controller_1.default.index).to.exist;
        });
        it("should send response", function () {
            home_controller_1.default.index(req, res);
            chai_1.expect(res.render.firstCall.args[0]).to.equal("home/home");
            chai_1.expect(res.render.firstCall.args[1]).to.be.an("object");
        });
    });
});

//# sourceMappingURL=home.controller.test.js.map
