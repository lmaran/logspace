const errors = require('./components/errors');
const path = require('path');
const auth = require('./api/user/login/loginService');
// const logger = require('./logging/logger');
// const reqHelper = require('./logging/reqHelper');

module.exports = function(app) {

    // API routes
    app.get('/api/users/checkEmail/:email',  require('./api/user/userController').checkEmail);
    app.use('/api/users', require('./api/user/userRoutes'));

    app.get('/api/customerEmployees/checkEmail/:email',  require('./api/customerEmployee/customerEmployeeController').checkEmail);
    app.use('/api/customerEmployees', auth.hasRole('admin'), require('./api/customerEmployee/customerEmployeeRoutes'));

    // RPC routes
    app.post('/login/', require('./api/user/login/local/loginLocalController').authenticate);
    app.get('/logout', auth.isAuthenticated(), require('./api/user/logout/logoutController').logout);
    // app.get('/me', auth.isAuthenticated(), require('./api/user/userController').me);
    app.post('/me/changepassword', auth.isAuthenticated(), require('./api/user/userController').changePassword);

    // server-side views
    app.get('/', function(req, res) { res.render('home/home', { user: req.user }); });
    app.get('/contact', function(req, res) { res.render('contact/contact', { user: req.user }); });
    app.get('/login', function(req, res) { res.render('user/login'); });
    app.get('/register', function(req, res) { res.render('user/register', { email: req.query.email }); });

    app.get('/activate/:id', require('./api/user/userController').activateUser);
    app.post('/activate/:id', require('./api/user/userController').saveActivationData);

    app.get('/changePassword', auth.isAuthenticated(), function(req, res){res.render('user/changePassword', {user: req.user}); });

    // client-side views

    app.get('/admin', function(req, res) {res.sendFile(path.resolve(app.get('appPath') + '/index.html')); });
    app.get('/admin|/admin/*', function(req, res) {res.sendFile(path.resolve(app.get('appPath') + '/index.html')); });

    // All undefined asset or api routes should return a 404
    app.get('/:url(api|auth|components|app|bower_components|assets)/*', errors[404]);
};
