import {Application, Request, Response} from "express";
import userRoutes from "./api/user/user.routes";
import homeRoutes from "./api/home/home.routes";

let allRoutes = function(app: Application) {
    // API routes
    userRoutes(app);
    homeRoutes(app);

    // server-side views
    // app.get("/", function(req: Request, res: Response) { res.render("home/home", { user: req.user }); });
    // app.get("/", function(req, res){ res.send("aaa");  });
};

export default allRoutes;