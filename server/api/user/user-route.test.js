// 'use strict'
// // We'll use this to override require calls in routes
// var proxyquire = require('proxyquire');
// // This will create stubbed functions for our overrides
// var sinon = require('sinon');
// // Supertest allows us to make requests against an express object
// var supertest = require('supertest');
// // Natural language-like assertions
// var expect = require('chai').expect;
// var express = require('express');
// describe('GET /ping', function () {
//   var app, getUserStub, getByIdStub, request, route;
//   beforeEach(function () {
//     // A stub we can use to control conditionals
//     getUserStub = sinon.stub();
//     getByIdStub = sinon.stub();
//     // Create an express application object
//     app = express();
//     // var route2 = require('./user-route.js');
//     // console.log(route2);
//     route = proxyquire('./user-route.js', {
//       './users': {
//         getByUsername: getUserStub,
//         getById: getByIdStub
//       }
//     }).userRoutes;
//     // Bind our application to
//     route(app);
//     // Get a supertest instance so we can make requests
//     request = supertest(app);
//   });
//   // it('should respond with a 404 and a null', function (done) {
//   //   getUserStub.returns(null);
//   //   request
//   //     .get('/users/nodejs')
//   //     .expect('Content-Type', /json/)
//   //     .expect(404, function (err, res) {
//   //       expect(res.body).to.deep.equal({
//   //         status: 'not ok',
//   //         data: null
//   //       });
//   //       done();
//   //     });
//   // });
//   it('should respond with 200 and a user object', function (done) {
//     // let userData =  'nodejs';
//     // let user = {
//     //     username: 'test'
//     // };
//     let getUserById = function(req, res){
//       res.json({data: 'nodejs'});
//     };
//     getUserStub.returns('nodejs');
//     getByIdStub.returns(getUserById);
//     //getByIdStub.yieldsTo("getById", getUserById);
//     request
//       .get('/users/nodejs')
//       .expect('Content-Type', /json/)
//       .expect(200, function (err, res) {
//         console.log(res.body)
//         expect(res.body).to.deep.equal({data: 'nodejs'});
//         done();
//       });
//   });
// }); 

//# sourceMappingURL=user-route.test.js.map
