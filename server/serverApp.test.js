"use strict";
var chai_1 = require("chai");
var serverApp_1 = require("./serverApp");
describe("server", function () {
    var server;
    before(function (done) {
        server = serverApp_1.default.listen(9877, function (err, result) {
            // if (err) { return done(err); }
            done();
        });
    });
    after(function () {
        server.close();
    });
    it("should exist", function () {
        chai_1.expect(serverApp_1.default);
    });
});

//# sourceMappingURL=serverApp.test.js.map
