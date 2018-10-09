import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import * as utils from '../utils';
import { Request, Response } from 'express';
import { Owner } from '../types/owner';


router.post('/addOwner', async (req: Request, res: Response) => {

    let hash = utils.utilities.createRandomToken(32);

    let owner: Owner = req.body.owner;
    owner.isVerified = false;
    owner.temptoken = hash;

    let result = await db.ownerTasks.addOwner(owner);
    console.log(!isNaN(result[0]));
    if (!isNaN(result[0])) {
        let htmlString = '<h3>Please click on the Link to verify your email address </h3><a href="http://localhost:3000/verifyToken/' + owner.temptoken + '"> verify account </a>'; // html body
        console.log(utils.utilities.sendEmail(owner.email, htmlString));
        res.json({ success: true });
    } else {
        res.json(res.json({ success: false, message: 'sorry cant add' }));
    }

});

router.get('/compareTempToken/:tempToken', async (req: Request, res: Response) => {
    let result = await db.ownerTasks.verifyTempToken(req.params.tempToken);
    if (result) {
        await db.ownerTasks.updateOwner(result.id, { isVerified: 1 });
        res.json({ success: true });
    } else {
        res.json({ success: false })
    }

});

router.post('/verifyUserName', async (req: Request, res: Response) => {

    let result = await db.ownerTasks.verifyUse('userName', req.body.values.userName);
    if (result) {
        res.json({ success: false, message: 'sorry username is taken' });
    } else {
        res.json({ success: true });
    }


});

router.post('/verifyEmail', async (req: Request, res: Response) => {

    let result = await db.ownerTasks.verifyUse('email', req.body.values.email);
    if (result) {
        res.json({ success: false, message: 'sorry email is taken' });
    } else {
        res.json({ success: true });
    }


});


export default router;