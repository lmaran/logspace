// (function () {
    import { UserController }  from './userController2';
    const express = require('express');
    const controller = require('./userController');
    const auth = require('./login/loginService');

    const router = express.Router();

    const c = new UserController();

    router.get('/', c.getAll);

    router.post('/', controller.create);
    router.post('/createpublicuser', controller.createPublicUser);
    router.get('/', auth.hasRole('admin'), controller.getAll);
    router.get('/\\$count', controller.getAll);
    router.get('/:id', auth.hasRole('admin'), controller.getById);
    router.get('/me', auth.isAuthenticated(), controller.me);
    router.put('/me/changepassword', auth.isAuthenticated(), controller.changePassword);
    router.put('/', auth.isAuthenticated(), controller.update);
    router.delete('/:id', auth.hasRole('admin'), controller.remove);

    module.exports = router;
// })();
