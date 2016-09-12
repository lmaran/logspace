import adminController from "./admin.controller";
import * as sinon from "sinon";
import { expect } from "chai";
import * as path from "path";
import config from "../../config/environment";

let req: any = {};
let res: any = {};

describe("Home Controller", function(){
    describe("Index", function(){

        beforeEach(function() {
            res = {
                sendFile: sinon.spy(),
                send: sinon.spy()
            };
        });

        it("should be defined", function(){
            expect(adminController.index).to.exist;
        });

        it("should send response", function(){
            adminController.index(req, res);
            let expectedRoute = path.resolve(path.join(config.root, "client/index.html"));
            expect(res.sendFile.firstCall.args[0]).to.equal(expectedRoute);
        });

    });
});