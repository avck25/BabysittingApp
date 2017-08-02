import { Login } from '../types/user';
import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

router.post('/', async (req: Request, res: Response) => {
    let loginInfo: Login = req.body;

    let login = await db.loginTasks.login(loginInfo);
    if(login){
        if((login.table === 'trainers' && login.user.isVerified)||login.table === 'clients') {
            let tokenObj = {
                userId: login.user.id
            };
            const token = jwt.sign(tokenObj, process.env.AUTH_SECRET, {
                expiresIn: "30m"
            });
            res.json({
                success: true,
                table: login.table,
                token,
                isAdmin: login.table === 'trainers'?login.user.isAdmin:false
            });
        } else {
            res.status(403).send('Invalid Login');
        }
    }else{
        res.status(403).send('Invalid Login')
    }
        
});

export default router;