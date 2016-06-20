// import express = require('express');
// import path = require('path');
// var port: number = process.env.PORT || 3000;
// var app = express();
 
// app.use('/app', express.static(path.resolve(__dirname, 'app')));
// app.use('/libs', express.static(path.resolve(__dirname, 'libs')));
 
// var renderIndex = (req: express.Request, res: express.Response) => {
//     res.sendFile(path.resolve(__dirname, 'index.html'));
// }
 
// app.get('/*', renderIndex);
 
// var server = app.listen(port, function() {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log('This express app is listening on port:' + port);
// });

// //import * as connectLivereload from 'connect-livereload';
// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// //import {resolve} from 'path';

// // import {LIVE_RELOAD_PORT, PATHS, PORT, APP_ROOT} from '../tools/config';
// // import * as contactRouter from './contact/router';

// const INDEX_DEST_PATH = resolve(PATHS.cwd, PATHS.dest.dist.base, 'index.html');

// const server = express();

// server.use(APP_ROOT, <any> connectLivereload({ port: LIVE_RELOAD_PORT }));
// server.use(express.static(PATHS.dest.dist.base));
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: false }));

// server.get('/api/**', (req, res, next) => {
//   // TODO: remove this. It just mimics a delay in the backend.
//   const delay = Math.floor((Math.random() * 300) + 1);
//   setTimeout(() => next(), delay);
// });

// server.use('/api/contact', contactRouter);

// server.get(`${APP_ROOT}*`, (req, res) => {
//   res.sendFile(INDEX_DEST_PATH);
// });

// server.listen(PORT);