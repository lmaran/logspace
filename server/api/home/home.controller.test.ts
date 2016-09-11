import homeController from "./home.controller";
import * as sinon from "sinon";
import { expect } from "chai";


let req: any = {};
let res: any = {};

describe("Home Controller", function(){
    describe("Index", function(){

        beforeEach(function() {
            res = {
                render: sinon.spy(),
                send: sinon.spy()
            };
        });

        it("should be defined", function(){
            expect(homeController.index).to.exist;
        });

        it("should send response", function(){
            homeController.index(req, res);
            expect(res.render.firstCall.args[0]).to.equal("home/home");
            expect(res.render.firstCall.args[1]).to.be.an("object");
        });

    });
});