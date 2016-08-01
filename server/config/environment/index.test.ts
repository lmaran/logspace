import * as chai from "chai";

// import config from "./production";



import config from "./" + ;

// import config from "./index";
// import * as path from "path";

let expect = chai.expect;

// const expected = {
//     env: "development",
//     port: process.env.PORT || 1410,

//     // Root path of server
//     root: path.normalize(__dirname + "/../../.."), // 3 folders back from the current folder

//     // Secret for session, you will want to change this and make it an environment variable
//     secrets: {
//         session: "node-fullstack-secret"
//     },

//     mongo: {
//         options: {
//             db: {
//                 // safe: true // in Mongo 2.0 this option is "true" by default and is equals to {w:1} - http://stackoverflow.com/a/14801527
//             }
//         }
//     },

//     rollbarToken: "c40dd41c292340419923230eed1d0d61",
// };



describe("config file has correct settings for", function () {

    it("development", function () {
        process.env.NODE_ENV = "development";
        let config = require("./index").default;

        expect(config.env).equal("development");
        expect(config.rollbarToken).equal("c40dd41c292340419923230eed1d0d61");
    });

    it("staging", function () {
        process.env.NODE_ENV = "staging";
        delete require.cache[require.resolve("./index")];
        let config = require("./index").default;

        expect(config.env).equal("staging");
        expect(config.rollbarToken).equal("c40dd41c292340419923230eed1d0d61");
        expect(config.gaCode).equal("UA-72165579-2");
    });

    it("production", function () {
        process.env.NODE_ENV = "production";
        delete require.cache[require.resolve("./index")];
        let config = require("./index").default;
        // import config from "./index";

        expect(config.env).equal("production");
        expect(config.rollbarToken).equal("c40dd41c292340419923230eed1d0d61");
        expect(config.gaCode).equal("UA-72165579-3");
    });

    // it("invalid", function () {
    //     process.env.NODE_ENV = null;
    //     delete require.cache[require.resolve("./index")];
    //     // let config = require("./index").default;
    //     // console.log(config);
    //     // expect(config.env).equal("development");
    //     // expect(config.rollbarToken).equal("c40dd41c292340419923230eed1d0d61");
    //     // expect(config.gaCode).equal("UA-72165579-3");
    // });

});