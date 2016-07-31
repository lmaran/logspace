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

});