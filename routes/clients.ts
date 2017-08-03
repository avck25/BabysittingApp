import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import { Owner } from '../types/owner';
import { Client } from '../types/client';
import * as utils from '../utils';
import { Request, Response } from 'express';



router.post('/addClient', async (req: Request, res: Response) => {
    let client: Client = req.body;
    //client.ownerId = req.userId;
    let id = await db.clientTasks.addClient(client);

    if (id) {
        res.json({ success: true, id: parseInt(id) })
    } else {
        res.json({ success: false })
    }


});

router.get('/getClient/:id', async (req: Request, res: Response) => {
    let client: Client = await db.clientTasks.getClient(req.params.id);

    res.json(client);
});



export default router;