import { app } from "../../server";
import * as supertest from "supertest";

let request = supertest(app);

describe("GET /user", function () {

  it("respond with json", function (done) {
    request
      .get("/api/user")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect([{_id: "5780eb7c9b711a3e2c1bc2d5", name: "lm" }], done);
  });

  it("respond with json", function (done) {
    request
      .get("/api/user")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect([{_id: "5780eb7c9b711a3e2c1bc2d5", name: "lm" }], done);
  });

  it("respond with 404", function (done) {
    request
      .get("/api/user2")
      .expect(404, done);
  });

  it("respond with json", function (done) {
    request
      .get("/api/user/5780eb7c9b711a3e2c1bc2d5")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({_id: "5780eb7c9b711a3e2c1bc2d5", name: "lm" }, done);
  });

});