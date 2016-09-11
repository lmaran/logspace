import { Request, Response } from "express";

const controller = {

    index: function (req: Request, res: Response) {
        // res.send("aabb");
        res.render("home/home", { user: req.user });
    }

};

export default controller;