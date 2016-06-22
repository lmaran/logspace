'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var config = require('./config/environment');
// var path = require('path');
// var port = process.env.PORT || 3000;
var app = express();
require('./config/express')(app);
require('./routes')(app);
// app.use('/app', express.static(path.resolve(__dirname, 'app')));
// //app.use('/libs', express.static(path.resolve(__dirname, 'libs')));
// var renderIndex = function (req, res) {
//     res.sendFile(path.resolve(__dirname, 'index.html'));
// };
// app.get('/*', renderIndex);
// Start server
app.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d in %s mode', config.port, config.env);
});
