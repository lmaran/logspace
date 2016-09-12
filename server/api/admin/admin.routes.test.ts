import adminRoutes from "./admin.routes";
import { expect } from "chai";
import * as sinon from "sinon";

import adminController from "./admin.controller";

describe("admin routes", function () {
    let app = {
        get: sinon.spy()
    };

    beforeEach(function () {
        adminRoutes(app);
    });

    it("/ -  should call the correct method in controller", function () {
        expect(app.get.calledWith("/admin|/admin/*", adminController.index)).to.be.true;
    });


});