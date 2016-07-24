import { expect } from "chai";
import app from "./app";

describe("server", () => {
    let server;

    before((done) => {
        server = app.listen(9877, (err, result) => {
            if (err) { return done(err); }
            done();
        });
    });

    after(() => {
        server.close();
    });

    it("should exist", () => {
        expect(app);
    });

});
