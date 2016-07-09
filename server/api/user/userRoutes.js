"use strict";
var userController_1 = require('./userController');
var loginService_1 = require('./login/loginService');
var express = require('express');
// const auth = require('./login/loginService');
var router = express.Router();
router.get('/', userController_1.default.getAll);
router.post('/', userController_1.default.create);
router.post('/createpublicuser', userController_1.default.createPublicUser);
router.get('/', loginService_1.default.hasRole('admin'), userController_1.default.getAll);
router.get('/\\$count', userController_1.default.getAll);
router.get('/:id', loginService_1.default.hasRole('admin'), userController_1.default.getById);
router.get('/me', loginService_1.default.isAuthenticated(), userController_1.default.me);
router.put('/me/changepassword', loginService_1.default.isAuthenticated(), userController_1.default.changePassword);
router.put('/', loginService_1.default.isAuthenticated(), userController_1.default.update);
router.delete('/:id', loginService_1.default.hasRole('admin'), userController_1.default.remove);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;

//# sourceMappingURL=userRoutes.js.map
