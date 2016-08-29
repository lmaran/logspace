import userRoutes from "./user.routes";
import { expect } from "chai";
import * as sinon from "sinon";

import userController from "./user.controller";

describe("User routes", function () {
    let app = {
        get: sinon.spy(),
        post: sinon.spy(),
        delete: sinon.spy()
    };

    beforeEach(function () {
        userRoutes(app);
    });

    it("/api/user/:id", function () {
        expect(app.get.calledWith("/api/user/:id", userController.getById)).to.be.true;
    });

    it("/api/user", function () {
        expect(app.get.calledWith("/api/user", userController.getAll)).to.be.true;
    });

});