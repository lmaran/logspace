import * as sinon from "sinon";
import { expect } from "chai";

let proxyquire, userRoutesStub, homeRoutesStub, app, routes;
    let getRoutesModule = function() {
        routes = proxyquire("./routes", {
            "./api/user/user.routes": { default: userRoutesStub },
            "./api/home/home.routes": { default: homeRoutesStub }
        });
    };

describe("Routes", function() {
    beforeEach(function(){
        proxyquire = require("proxyquire");
        app = {
            get: sinon.spy()
        };
        userRoutesStub = sinon.stub();
        homeRoutesStub = sinon.stub();
    });

    it("should call userRoutes", function(){
        getRoutesModule();
        routes.default(app); // a 'default' function is exported
        expect(userRoutesStub.calledWith(app)).to.be.true;
    });

    it("should call homeRoutes", function(){
        getRoutesModule();
        routes.default(app); // a 'default' function is exported
        expect(homeRoutesStub.calledWith(app)).to.be.true;
    });

});

