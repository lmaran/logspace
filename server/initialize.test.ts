import * as sinon from "sinon";
import { expect } from "chai";

let proxyquire, routesStub, app, initialize;
    let getInitializeModule = function() {
        initialize = proxyquire("./initialize", {
            "./routes": { default: routesStub }
        });
    };

describe("Initialize", function() {
    beforeEach(function(){
        proxyquire = require("proxyquire");
        app = {
            set: sinon.spy(),
            engine: sinon.spy()
        };
        routesStub = sinon.stub();
    });

    describe("Bootstrapping", function(){
        it("should call routes", function(){
            getInitializeModule();
            initialize.default(app); // a 'default' function is exported
            expect(routesStub.calledWith(app)).to.be.true;
        });

    });

});

