// // import { expect } from "chai";
// import * as request from "supertest";
"use strict";
var app_1 = require("./app");
// describe("GET /user", function() {
//   it("respond with json", function(done) {
//     request(app)
//       .get("/")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200, done);
//   });
// });
var request = require("supertest");
// let express = require("express");
// let app = express();
// app.get("/user", function(req, res) {
//   res.status(200);
//   res.json({ name: "lm2" });
// });
describe("GET /user", function () {
    it("respond with json", function (done) {
        request(app_1.default)
            .get("/user")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, { name: "lm" }, done);
    });
});

//# sourceMappingURL=app.test.js.map
