// // // import { expect } from "chai";


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


import { app } from "./server";
import * as supertest from "supertest";

let request = supertest(app.listen());

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