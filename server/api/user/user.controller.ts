import { Request, Response } from "express";
import { userService } from "./user.service";

const controller = {

    getAll: function (req: Request, res: Response) {
        return userService.getAll(function (err, users) {
            // if(err) { return handleError(res, err); }
            res.status(200).json(users);
        });
        // res.status(200).json([{}]);
    },

    getById: function (req: Request, res: Response, next) {
        let userId = req.params.id;
        // console.log(userId);
        userService.getById(userId, function (err, user) {
            // if (err) { return next(err); }
            // if (!user) { return res.status(401).send("Unauthorized"); }
            res.json(user);
        });
    },
};

export { controller as userController };