"use strict";
var chai_1 = require("chai");
var reqHelper_1 = require("./reqHelper");
describe("reqHelper", function () {
    it("Should return an IPv4 from a request with IPv6", function () {
        var req = {};
        req.ip = "::ffff:127.0.0.1";
        chai_1.expect(reqHelper_1.default._getIp(req)).equal("127.0.0.1");
    });
    it("Should return an empty string from a request with no IP", function () {
        var req = {};
        chai_1.expect(reqHelper_1.default._getIp(req)).equal("");
    });
});

//# sourceMappingURL=reqHelper.test.js.map
