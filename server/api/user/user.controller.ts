import { Request, Response } from "express";
import userService from "./user.service";

const controller = {

    getAll: function (req: Request, res: Response, next) {
        return userService.getAll(function (err, users) {
            // if(err) { return handleError(res, err); }
            res.status(200).json(users);
        });
        // res.json([{name: "aaa"}]);
    },

    getById: function (req: Request, res: Response, next) {
        let userId = req.params.id;

        userService.getById(userId, function (err, user) {
            // if (err) { return next(err); }
            // if (!user) { return res.status(401).send("Unauthorized"); }
            res.json(user);
        });

        // res.json({name: "aaa"});
    }
};

export default controller;