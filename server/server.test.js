// // // import { expect } from "chai";
"use strict";
// // // ok, but requires that app to be started
// // https://github.com/mochajs/mocha/issues/1912
// import {app, server} from "./app";
// import * as supertest from "supertest";
// let request = supertest.agent(app);
// describe("GET /user", function () {
//   after(function (done) {
//     server.close();
//     done();
//   });
//   it("respond with json", function (done) {
//     request
//       .get("/user")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .expect({ name: "tobi" }, done);
//   });
//   it("respond with json2", function (done) {
//     request
//       .get("/user")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .expect({ name: "tobi" }, done);
//   });
// });
var server_1 = require("./server");
var supertest = require("supertest");
var request = supertest(server_1.app.listen());
describe("GET /user", function () {
    it("respond with json", function (done) {
        request
            .get("/user")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect({ name: "tobi" }, done);
    });
});

//# sourceMappingURL=server.test.js.map
