// // import { expect } from "chai";
// import * as request from "supertest";

import app from "./app";

// describe("GET /user", function() {
//   it("respond with json", function(done) {
//     request(app)
//       .get("/")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200, done);
//   });
// });

let request = require("supertest");
// let express = require("express");

// let app = express();

// app.get("/user", function(req, res) {
//   res.status(200);
//   res.json({ name: "lm2" });
// });

describe("GET /user", function() {
  it("respond with json", function(done) {
    request(app)
      .get("/user")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, { name: "lm" }, done);
  });
});