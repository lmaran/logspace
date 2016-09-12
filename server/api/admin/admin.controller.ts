import { Request, Response } from "express";
import * as path from "path";
import config from "../../config/environment";

const controller = {

    index: function (req: Request, res: Response) {
        // console.log(path.resolve(path.join(config.root, "client/index.html")));
        res.sendFile(path.resolve(path.join(config.root, "client/index.html")));
    }

};

export default controller;