"use strict";
var express_1 = require('express');
var environment_1 = require('./config/environment');
var errors = require('./components/errors');
var path = require('path'); // do not expose ES6 module
var auth = require('./api/user/login/loginService');
var router = express_1.Router();
// router.get('/', userCtrl.getAll);
// API routes
router.get('/api/users/checkEmail/:email', require('./api/user/userController').checkEmail);
router.use('/api/users', require('./api/user/userRoutes'));
// RPC routes
router.post('/login/', require('./api/user/login/local/loginLocalController').authenticate);
router.get('/logout', auth.isAuthenticated(), require('./api/user/logout/logoutController').logout);
// router.get('/me', auth.isAuthenticated(), require('./api/user/userController').me);
router.post('/me/changepassword', auth.isAuthenticated(), require('./api/user/userController').changePassword);
// server-side views
router.get('/', function (req, res) { res.render('home/home', { user: req.user }); });
router.get('/contact', function (req, res) { res.render('contact/contact', { user: req.user }); });
router.get('/login', function (req, res) { res.render('user/login'); });
router.get('/register', function (req, res) { res.render('user/register', { email: req.query.email }); });
router.get('/activate/:id', require('./api/user/userController').activateUser);
router.post('/activate/:id', require('./api/user/userController').saveActivationData);
router.get('/changePassword', auth.isAuthenticated(), function (req, res) { res.render('user/changePassword', { user: req.user }); });
// client-side views
router.get('/admin', function (req, res) { res.sendFile(path.resolve(path.join(environment_1.default.root, 'client/index.html'))); });
router.get('/admin|/admin/*', function (req, res) { res.sendFile(path.resolve(path.join(environment_1.default.root, 'client/index.html'))); });
// All undefined asset or api routes should return a 404
router.get('/:url(api|auth|components|app|bower_components|assets)/*', errors[404]);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
