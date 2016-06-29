// https://github.com/moizKachwala/Angular2-Typescript-MongoDb-ExpressJs-NodeJs/blob/master/server/src/controllers/HeroController.ts
// const userService = require('./userService');
import { Request, Response }  from 'express';
import { userService2 }  from './userService2';

class UserController {

    getAll(req: Request, res: Response) {
        let odataQuery = req.query;
        odataQuery.hasCountSegment = req.url.indexOf('/$count') !== -1; // check for $count as a url segment

        userService2.getAll(odataQuery, function (err, users) {
            let that: UserController = this;
            if (err) { return that._handleError(res, err); }
            res.status(200).json(users);
        });
    };

    private _handleError(res, err) {
        return res.status(500).send(err);
    };
}

export { UserController }
