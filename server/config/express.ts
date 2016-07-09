import config from './environment';
import * as path from 'path';
import auth from '../api/user/login/loginService';

const express = require('express');
const favicon = require('serve-favicon');

const bodyParser = require('body-parser');

const passport = require('passport');
const cookieParser = require('cookie-parser');
// const auth = require('../api/user/login/loginService');
const httpLogHandler = require('../logging/httpLogHandler'); // custom error handler
const exphbs = require('express-handlebars');



module.exports = function(app) {
    let env = app.get('env');

    app.set('views', config.root + '/server/views');

    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        extname: '.hbs',
        // in the feature we probably don't need the next 2 lines
        // https://github.com/ericf/express-handlebars/issues/147#issuecomment-159737839
        layoutsDir: config.root + '/server/views/layouts/',
        partialsDir: config.root + '/server/views/partials/',

        // ensure the javascript is at the bottom of the code in express-handlebars template
        // http://stackoverflow.com/a/25307270
        helpers: {
            section: function(name, options){
                if (!this._sections) { this._sections = {}; };
                this._sections[name] = options.fn(this);
                return null;
            }
        }
    }));

    app.set('view engine', '.hbs');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names

    app.use(passport.initialize());

    app.locals.gaCode = config.gaCode; // google Analytics code (e.g. 'UA-72165579-1'); http://stackoverflow.com/a/25097453

    if (env === 'production' || env === 'staging') {
        app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));

        app.use(express.static(path.join(config.root, 'client'), { index: '_' }));

        // app.use(morgan('tiny', { // like 'dev' but no colors
        //     //skip: function(req, res) { return res.statusCode < 400 },
        //     stream: logger.stream })); 

    } else { // development
        app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));

        // if you are happy with a browser plugin, then you don't need this middleware
        // live-reload corrupts pdf files: http://stackoverflow.com/a/28091651/2726725
        app.use(require('connect-livereload')({
            port: 35729, // default=35729
            ignore: [/print/]  // all that contains 'print': https://github.com/intesso/connect-livereload#options
        }));

        // without last argument express serves index.html even when my routing is to a different file: 
        // http://stackoverflow.com/a/25167332/2726725
        // It is also recommended to put static middleware first: http://stackoverflow.com/a/28143812/2726725 
        // Have this pb. only when I try to serve another jade page as homepage
        app.use('/', express.static(path.join(config.root, 'client'), { index: '_'} ));
        app.use('/node_modules', express.static(path.join(config.root, 'node_modules'))); // to serve node_modules

        // app.use(morgan('dev', { stream: logger.stream })); 
        // app.use(morgan('dev'));
    }

    // log all http requests (like morgan)
    app.use(httpLogHandler());

    // add a second static source for static files: 
    // http://stackoverflow.com/questions/5973432/setting-up-two-different-static-directories-in-node-js-express-framework
    app.use('/public', express.static(path.join(config.root, 'server/public')));

    // for js files used by some views
    app.use('/views', express.static(path.join(config.root, 'server/views')));

    app.use(auth.addUserIfExist());
};
