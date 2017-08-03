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
    owner.tempToken = hash;

    let result = await db.ownerTasks.addOwner(owner);

    let htmlString = '<h3>Please click on the Link to verify your email address </h3><a href="http://localhost:3000/verifyToken/' + owner.tempToken + '"> verify account </a>'; // html body
    utils.utilities.sendEmail(owner.email, htmlString);
    res.json('success');

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


export default router;