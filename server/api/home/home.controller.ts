import { Request, Response } from "express";

const controller = {

    index: function (req: Request, res: Response) {
        res.send("aabb");
    }

};

export default controller;