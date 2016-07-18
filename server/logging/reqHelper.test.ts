import { expect } from "chai";
import result from "./reqHelper";

describe("reqHelper", () => {

    it("Should return an IPv4 from a request with IPv6", () => {
        let req: any = {};
        req.ip = "::ffff:127.0.0.1";
        console.log(result._getIp(req));
        console.log("test-123");
        expect(result._getIp(req)).equal("127.0.0.1");
    });

    it("Should return an empty string from a request with no IP", () => {
        let req: any = {};
        expect(result._getIp(req)).equal("");
    });

});
