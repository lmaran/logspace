"use strict";
var chai_1 = require("chai");
// const app = require("./app");
var app_1 = require("./app");
describe("server", function () {
    // let app;
    // beforeEach(function () {
    //     app.boot();
    // });
    // afterEach(function () {
    //     // app.server.close();
    //     app.shutdown();
    // });
    var server;
    before(function (done) {
        server = app_1.default.listen(9877, function (err, result) {
            // if (err) { return done(err); }
            done();
        });
        // this.request = request.defaults({
        //     baseUrl: 'http://localhost:9876/'
        // });
    });
    after(function () {
        server.close();
    });
    it("should exist", function () {
        chai_1.expect(app_1.default);
    });
    // it("should have a default environment", () => {
    //     // process.env.NODE_ENV = undefined;
    //     // require("./app");
    //     // var app = express();
    //     expect(process.env.NODE_ENV).equal("development");
    //     // app.close();
    // });
    // it("Should have a default environment", () => {
    //     process.env.NODE_ENV = "production";
    //     expect(process.env.NODE_ENV).equal("production");
    // });
});

//# sourceMappingURL=app.test.js.map
