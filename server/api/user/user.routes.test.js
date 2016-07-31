"use strict";
var server_1 = require("../../server");
var supertest = require("supertest");
var request = supertest(server_1.app);
describe("GET /user", function () {
    it("respond with json", function (done) {
        request
            .get("/api/user")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect([{ name: "lm" }], done);
    });
});

//# sourceMappingURL=user.routes.test.js.map
