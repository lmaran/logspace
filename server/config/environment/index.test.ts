import * as path from "path";
import * as chai from "chai";
let expect = chai.expect;

describe("config file has correct settings for", function () {

    beforeEach(function(){
        delete require.cache[require.resolve("./index")];
    });

    it("development", function () {
        process.env.NODE_ENV = "development";
        delete process.env.PORT;
        let config = require("./index").default;

        expect(config.env).equal("development");
        expect(config.port).equal(1410);
        expect(config.mongo.uri).equal("mongodb://localhost/logspace-dev");
        expect(config.rollbarToken).equal("c40dd41c292340419923230eed1d0d61");
        expect(config.root).equal(path.normalize(__dirname + "/../../.."));
    });

    it("staging", function () {
        process.env.NODE_ENV = "staging";
        process.env.PORT = 1420;
        let config = require("./index").default;

        expect(config.env).equal("staging");
        expect(config.port).equal("1420");
        expect(config.mongo.uri).equal("bbb");
        expect(config.rollbarToken).equal("c40dd41c292340419923230eed1d0d61");
        expect(config.root).equal(path.normalize(__dirname + "/../../.."));
    });

    it("production", function () {
        process.env.NODE_ENV = "production";
        process.env.PORT = 1430;
        let config = require("./index").default;

        expect(config.env).equal("production");
        expect(config.port).equal("1430");
        expect(config.mongo.uri).equal("aaa");
        expect(config.rollbarToken).equal("c40dd41c292340419923230eed1d0d61");
        expect(config.root).equal(path.normalize(__dirname + "/../../.."));
    });

    it("NODE_ENV not defined", function () {
        delete process.env.NODE_ENV;
        let config = require("./index").default;

        expect(config.env).equal("development");
    });

});