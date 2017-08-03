import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import { Owner } from '../types/owner';
import { ClientHours } from '../types/clientHours';
import * as utils from '../utils';
import { Request, Response } from 'express';



router.post('/addHours', async (req: Request, res: Response) => {
    let clienthours: ClientHours = req.body;
    //client.ownerId = req.userId;
    let id = await db.hourTasks.addHours(clienthours);
    if (id) {
        res.json({ success: true })
    } else {
        res.json({ success: false })
    }


});

router.get('/gethours/:id', async (req: Request, res: Response) => {
    let clientHours: ClientHours = await db.hourTasks.getHours(req.params.id);

    res.json(clientHours);

});



export default router;