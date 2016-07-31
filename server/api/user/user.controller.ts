import { Request, Response } from "express";
import { userService } from "./user.service";

let controller: any = {};

controller.getAll = function(req: Request, res: Response) {
  return userService.getAll(function(err, users){
    // if(err) { return handleError(res, err); }
    res.status(200).json(users);
  });
};

export { controller as userController };