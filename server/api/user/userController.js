"use strict";
var userService_1 = require("./userService");
var userValidator_1 = require("./userValidator");
// import * as uuid from "node-uuid";
var uuid = require("node-uuid");
var auth = require("./login/loginService");
var userController = {
    getAll: function (req, res) {
        var odataQuery = req.query;
        odataQuery.hasCountSegment = req.url.indexOf("/$count") !== -1; // check for $count as a url segment
        userService_1.default.getAll(odataQuery, function (err, users) {
            if (err) {
                return handleError(res, err);
            }
            res.status(200).json(users);
        });
    },
    create: function (req, res, next) {
        userValidator_1.default.all(req, res, function (errors) {
            if (errors) {
                res.status(400).send({ errors: errors }); // 400 - bad request
            }
            else {
                var user = req.body;
                user.isActive = true;
                user.provider = "local";
                user.role = "admin";
                user.createdBy = req.user.name;
                user.createdOn = new Date();
                user.activationToken = uuid.v4();
                // user.status = "waitingToBeActivated";
                userService_1.default.create(user, function (err, response) {
                    if (err) {
                        return handleError(res, err);
                    }
                    res.status(201).json(response.ops[0]);
                    // // send an email with an activationLink
                    // let from = user.email;
                    // let subject = "Activare cont";
                    // let tpl = "";
                    //     tpl += "<p style="margin-bottom:30px;">Buna <strong>" + user.name + "</strong>,</p>";
                    //     tpl += user.createdBy + " ti-a creat un cont de acces in aplicatie. ";
                    //     tpl += "Pentru activarea acestuia, te rog sa folosesti link-ul de mai jos:";
                    //     tpl += "<p><a href="" + config.externalUrl + "/activate/" 
                    // + user._id + "?activationToken=" + user.activationToken + "">Activare cont</a></p>";
                    //     tpl += "<p style="margin-top:30px">Acest email a fost generat automat.</p>";
                    //     emailService.sendEmail(from, subject, tpl).then(function (result) {
                    //         console.log(result);
                    //         //res.status(201).json(response.ops[0]);
                    //     }, function (err) {
                    //         console.log(err);
                    //         //handleError(res: Response, err)
                    //     });
                });
            }
        });
    },
    createPublicUser: function (req, res, next) {
        var data = req.body;
        var user = {};
        user.name = "aaa";
        user.email = data.email;
        user.salt = userService_1.default.makeSalt();
        user.hashedPassword = userService_1.default.encryptPassword(data.password, user.salt);
        user.provider = "local";
        user.role = "user";
        user.isActive = true;
        user.createdBy = "External user";
        user.createdOn = new Date();
        userService_1.default.create(user, function (err2, response) {
            if (err2) {
                return handleError(res, err2);
            }
            // keep user as authenticated    
            var token = auth.signToken(user._id, user.role);
            var userProfile = {
                name: user.name,
                email: user.email,
                role: user.role
            };
            auth.setCookies(req, res, token, userProfile);
            res.redirect("/");
        });
    },
    getById: function (req, res, next) {
        var userId = req.params.id;
        userService_1.default.getByIdWithoutPsw(userId, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).send("Unauthorized");
            }
            res.json(user);
        });
    },
    update: function (req, res) {
        var user = req.body;
        user.modifiedBy = req.user.name;
        user.modifiedOn = new Date();
        userService_1.default.updatePartial(user, function (err, response) {
            if (err) {
                return handleError(res, err);
            }
            if (!response.value) {
                res.sendStatus(404); // not found
            }
            else {
                res.sendStatus(200);
            }
        });
    },
    remove: function (req, res) {
        var id = req.params.id;
        userService_1.default.remove(id, function (err, response) {
            if (err) {
                return handleError(res, err);
            }
            res.sendStatus(204);
        });
    },
    changePassword: function (req, res, next) {
        var userId = String(req.user._id); // without "String" the result is an Object
        var oldPass = String(req.body.oldPassword);
        var newPass = String(req.body.newPassword);
        userService_1.default.getById(userId, function (err, user) {
            if (userService_1.default.authenticate(oldPass, user.hashedPassword, user.salt)) {
                user.salt = userService_1.default.makeSalt();
                user.hashedPassword = userService_1.default.encryptPassword(newPass, user.salt);
                delete user.password;
                userService_1.default.update(user, function (err2, response) {
                    if (err2) {
                        return validationError(res, err2);
                    }
                    if (req.is("json")) {
                        res.json({}); // for requests that come from client-side (Angular)
                    }
                    else {
                        res.redirect("/");
                    } // for requests that come from server-side (Jade)
                    // res.status(200).send("OK");
                });
            }
            else {
                res.status(403).send("Forbidden");
            }
        });
    },
    me: function (req, res, next) {
        var userId = req.user._id.toString();
        userService_1.default.getByIdWithoutPsw(userId, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).send("Unauthorized");
            }
            res.json(user);
        });
    },
    authCallback: function (req, res, next) {
        res.redirect("/");
    },
    saveActivationData: function (req, res, next) {
        var userId = req.params.id;
        var psw = req.body.password;
        userService_1.default.getById(userId, function (err, user) {
            user.salt = userService_1.default.makeSalt();
            user.hashedPassword = userService_1.default.encryptPassword(psw, user.salt);
            delete user.activationToken;
            user.modifiedBy = user.name;
            user.modifiedOn = new Date();
            userService_1.default.update(user, function (err2, response) {
                if (err2) {
                    return validationError(res, err2);
                }
                // keep user as authenticated    
                var token = auth.signToken(user._id, user.role);
                var userProfile = {
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
                auth.setCookies(req, res, token, userProfile);
                res.redirect("/");
            });
        });
    },
    activateUser: function (req, res, next) {
        var userId = req.params.id;
        var activationToken = req.query.activationToken;
        userService_1.default.getByIdWithoutPsw(userId, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).send("Link incorect sau expirat (utilizator negasit).");
            }
            if (user.activationToken !== activationToken) {
                return res.status(400).send("Acest cont a fost deja activat.");
            }
            var context = {
                user: user,
            };
            res.render("user/activate", context);
        });
    },
    checkEmail: function (req, res) {
        var email = req.params.email;
        userService_1.default.getByValue("email", email, null, function (err, user) {
            if (err) {
                return handleError(res, err);
            }
            if (user) {
                res.send(true);
            }
            else {
                res.send(false);
            }
        });
    }
};
function validationError(res, err) {
    return res.status(422).json(err);
}
;
function handleError(res, err) {
    return res.status(500).send(err);
}
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userController;

//# sourceMappingURL=userController.js.map
