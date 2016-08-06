"use strict";
var path = require("path");
var chai_1 = require("chai");
describe("config file has correct settings for", function () {
    beforeEach(function () {
        delete require.cache[require.resolve("./index")];
    });
    it("development", function () {
        process.env.NODE_ENV = "development";
        delete process.env.PORT;
        var config = require("./index").default;
        chai_1.expect(config.env).equal("development");
        chai_1.expect(config.port).equal(1410);
        chai_1.expect(config.mongo.uri).equal("mongodb://localhost/logspace-dev");
        chai_1.expect(config.rollbarToken).equal("c40dd41c292340419923230eed1d0d61");
        chai_1.expect(config.root).equal(path.normalize(__dirname + "/../../.."));
    });
    it("staging", function () {
        process.env.NODE_ENV = "staging";
        process.env.PORT = 1420;
        var config = require("./index").default;
        chai_1.expect(config.env).equal("staging");
        chai_1.expect(config.port).equal("1420");
        chai_1.expect(config.mongo.uri).equal("bbb");
        chai_1.expect(config.rollbarToken).equal("c40dd41c292340419923230eed1d0d61");
        chai_1.expect(config.root).equal(path.normalize(__dirname + "/../../.."));
    });
    it("production", function () {
        process.env.NODE_ENV = "production";
        process.env.PORT = 1430;
        var config = require("./index").default;
        chai_1.expect(config.env).equal("production");
        chai_1.expect(config.port).equal("1430");
        chai_1.expect(config.mongo.uri).equal("aaa");
        chai_1.expect(config.rollbarToken).equal("c40dd41c292340419923230eed1d0d61");
        chai_1.expect(config.root).equal(path.normalize(__dirname + "/../../.."));
    });
    it("NODE_ENV not defined", function () {
        delete process.env.NODE_ENV;
        var config = require("./index").default;
        chai_1.expect(config.env).equal("development");
    });
});

//# sourceMappingURL=index.test.js.map
