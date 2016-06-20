'use strict';

// var errors = require('./components/errors');
var path = require('path');
// var auth = require('./api/user/login/loginService');
// var logger = require("./logging/logger");
// var reqHelper = require("./logging/reqHelper");
var config = require('./config/environment');

module.exports = function(app) {
    
    // ## test only (start)
    app.get('/error', function (req, res, next) {
        // here we cause an error in the pipeline so we see express-winston in action.
        return next(new Error("This is an error and it should be logged to the console"));
    });
    
    app.get('/unhandled', function (req, res, next) {
        var foo = bar();
        return next();
    });    

    app.get("/test", function(req, res, next) {
        logger.info('hit test page');
        res.json('This is an info request');
        return next();
    });
    
    app.get("/warning", function(req, res, next) {
        logger.warn('hit warning page');
        res.json('This is a warning request.');
        return next();
    });    
    
    app.get("/testmeta", function(req, res, next) {
        logger.info('hit test page (with meta)', {some:'optional metadata'});
        res.json('This is a normal request (with meta)');
        return next();
    });
    
    app.get("/testreq", function(req, res, next) {        
        logger.info('hit test page (with req)', reqHelper.getShortReq(req));
        res.json('This is a normal request (with reg), it should be logged to the console too');
        return next();
    });       
    // ## test only (end)
    
    // // API routes
    // app.get('/api/users/checkEmail/:email',  require('./api/user/userController').checkEmail);    
    // app.use('/api/users',require('./api/user/userRoutes'));
    // app.use('/api/preferences', auth.hasRole('admin'), require('./api/preference/preferenceRoutes'));
    
    // app.post('/api/myPreferences', auth.hasRole('user'), require('./api/preference/preferenceController').saveMyPreferences);
    
    // app.use('/api/buildInfo', require('./api/buildInfo/buildInfoRoutes'));   
    // app.use('/api/dishes', auth.hasRole('admin'), require('./api/dish/dishRoutes'));
    
    // app.get('/api/customerEmployees/checkEmail/:email',  require('./api/customerEmployee/customerEmployeeController').checkEmail);
    // app.use('/api/customerEmployees', auth.hasRole('admin'), require('./api/customerEmployee/customerEmployeeRoutes'));
    
    // app.use('/api/menus', auth.hasRole('admin'), require('./api/menu/menuRoutes'));
    // app.use('/api/orders', auth.hasRole('admin'), require('./api/order/orderRoutes'));
    // app.use('/api/partnerOrders', auth.hasRole('partner'), require('./api/partnerOrder/partnerOrderRoutes'));
    // app.use('/api/orderLines', auth.hasRole('admin'), require('./api/orderLine/orderLineRoutes'));
    // app.use('/api/deliveries', auth.hasRole('admin'), require('./api/delivery/deliveryRoutes'));
    // app.use('/api/deliveryLogs', auth.hasRole('admin'), require('./api/deliveryLog/deliveryLogRoutes'));

    
    // // RPC routes
    // app.post('/login/', require('./api/user/login/local/loginLocalController').authenticate);       
    // app.get('/logout', auth.isAuthenticated(), require('./api/user/logout/logoutController').logout);
    // // app.get('/me', auth.isAuthenticated(), require('./api/user/userController').me);
    // app.post('/me/changepassword', auth.isAuthenticated(), require('./api/user/userController').changePassword); 
       
    // app.get('/menus/currentWeek/print',  require('./api/menu/menuController').printCurrentWeek);
    // app.get('/menus/nextWeek/print', require('./api/menu/menuController').printNextWeek);
    // app.get('/menus/:id/print', require('./api/menu/menuController').printById);
    
    // server-side views
    app.get('/',function(req,res){res.render('home/home', {user: req.user});}); 
    // app.get('/contact', function(req,res){res.render('contact/contact', {user: req.user});});
    // app.get('/login', function(req,res){res.render('user/login');});
    // app.get('/register', function(req,res){res.render('user/register', {email: req.query.email});}); 
    
    // app.get('/activate/:id', require('./api/user/userController').activateUser); 
    // app.post('/activate/:id', require('./api/user/userController').saveActivationData); 
    
    // app.get('/changePassword', auth.isAuthenticated(), function(req,res){res.render('user/changePassword', {user: req.user});});
    // app.get('/todaysMenu', require('./views/menu/menuController').renderTodaysMenu);  
    // app.get('/nextMenus', require('./views/menu/menuController').renderNextMenus);     

    
    // client-side views
    //app.get('/admin|/admin/*', auth.hasRole('admin'), function(req, res) {res.sendFile(path.resolve(app.get('appPath') + '/index.html'));});
    app.get('/admin', function(req, res) {res.sendFile(path.resolve(app.get('appPath') + '/index.html'));});    
    app.get('/admin|/admin/*', function(req, res) {res.sendFile(path.resolve(app.get('appPath') + '/index.html'));});

  
    // All undefined asset or api routes should return a 404
    //app.get('/:url(api|auth|components|app|bower_components|assets)/*', errors[404]);       
};
