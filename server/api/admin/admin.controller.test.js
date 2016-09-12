"use strict";
var admin_controller_1 = require("./admin.controller");
var sinon = require("sinon");
var chai_1 = require("chai");
var path = require("path");
var environment_1 = require("../../config/environment");
var req = {};
var res = {};
describe("Home Controller", function () {
    describe("Index", function () {
        beforeEach(function () {
            res = {
                sendFile: sinon.spy(),
                send: sinon.spy()
            };
        });
        it("should be defined", function () {
            chai_1.expect(admin_controller_1.default.index).to.exist;
        });
        it("should send response", function () {
            admin_controller_1.default.index(req, res);
            var expectedRoute = path.resolve(path.join(environment_1.default.root, "client/index.html"));
            chai_1.expect(res.sendFile.firstCall.args[0]).to.equal(expectedRoute);
        });
    });
});

//# sourceMappingURL=admin.controller.test.js.map
