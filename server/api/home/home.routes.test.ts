import homeRoutes from "./home.routes";
import { expect } from "chai";
import * as sinon from "sinon";

import homeController from "./home.controller";

describe("Home routes", function () {
    let app = {
        get: sinon.spy()
        // post: sinon.spy(),
        // delete: sinon.spy()
    };

    beforeEach(function () {
        homeRoutes(app);
    });

    it("/ -  should call the correct method in controller", function () {
        expect(app.get.calledWith("/", homeController.index)).to.be.true;
    });


});