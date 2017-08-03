import { Login } from '../types/login';
import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

router.post('/', async (req: Request, res: Response) => {
    let loginInfo: Login = req.body;

    let login = await db.loginTasks.login(loginInfo);
    if (typeof (login) !== 'string') {
        let tokenObj = {
            ownerId: login.id
        };
        const token = jwt.sign(tokenObj, process.env.AUTH_SECRET, {
            expiresIn: "30m"
        });
        res.json({
            success: true,
            token
        });
    } else {
        res.status(403).send(login);
    }
});

export default router;