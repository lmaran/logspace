"use strict";
var chai = require("chai");
var expect = chai.expect;
describe("config file has correct settings for", function () {
    beforeEach(function () {
        delete require.cache[require.resolve("./index")];
    });
    it("development", function () {
        process.env.NODE_ENV = "development";
        // delete require.cache[require.resolve("./index")];
        var config = require("./index").default;
        expect(config.env).equal("development");
        expect(config.rollbarToken).equal("c40dd41c292340419923230eed1d0d61");
    });
    it("staging", function () {
        process.env.NODE_ENV = "staging";
        // delete require.cache[require.resolve("./index")];
        var config = require("./index").default;
        expect(config.env).equal("staging");
        expect(config.rollbarToken).equal("c40dd41c292340419923230eed1d0d61");
        expect(config.gaCode).equal("UA-72165579-2");
    });
    it("production", function () {
        process.env.NODE_ENV = "production";
        // delete require.cache[require.resolve("./index")];
        var config = require("./index").default;
        // import config from "./index";
        expect(config.env).equal("production");
        expect(config.rollbarToken).equal("c40dd41c292340419923230eed1d0d61");
        expect(config.gaCode).equal("UA-72165579-3");
    });
    it("not defined", function () {
        delete process.env.NODE_ENV;
        // expect(process.env.NODE_ENV).to.be.undefined;
        // console.log(process.env.NODE_ENV);
        // delete require.cache[require.resolve("./index")];
        var config = require("./index").default;
        expect(config.env).equal("development");
    });
});

//# sourceMappingURL=index.test.js.map
