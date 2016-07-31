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
      .expect([{ name: "lm" }], done);
  });

});