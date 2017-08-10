import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import { Owner } from '../types/owner';
import { Client } from '../types/client';
import { UpdatingClient } from '../types/updatingClient';
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

router.post('/archive', async (req: Request, res: Response) => {
    let id = req.body.id;
    await db.clientTasks.updateClient(id, { archived: 1 });
    res.json({ success: true });
});

router.post('/updateClient', async (req: Request, res: Response) => {
    let updatingClient: UpdatingClient = req.body;

    await db.clientTasks.updateClient(updatingClient.id, updatingClient);

    res.json({ success: true });
});





export default router;