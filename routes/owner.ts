import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import { Owner } from '../types/owner';
import { UpdatingOwner } from '../types/updatingOwner';
import { Client } from '../types/client';
import * as utils from '../utils';


import { Request, Response } from 'express';

router.post('/addOwner', async (req: Request, res: Response) => {
    let owner: Owner = req.body;
    let response = await db.ownerTasks.addOwner(req.body);
    if (typeof (response) === 'object') {
        res.json({ success: true, id: parseInt(response) })
    } else {
        let message;
        if (response === 'ER_DUP_ENTRY') {
            message = 'sorry That username/password exists already please choose another one';
        } else {
            message = response;
        }
        res.json({ success: false, message: message })
    }
});

router.get('/getAllClients/:id', async (req: Request, res: Response) => {
    let clients: Array<Client> = await db.ownerTasks.getAllClients(/*req.userId*/req.params.id);

    res.json(clients);

});

router.get('/getCurrentClients/:id', async (req: Request, res: Response) => {
    let clients: Array<Client> = await db.ownerTasks.getCurrentClients(/*req.userId*/req.params.id);

    res.json(clients);

});

router.get('/getOwner/:id', async (req: Request, res: Response) => {
    let owner: Owner = await db.ownerTasks.getOwner(req.params.id);

    res.json(owner);
});

router.post('/updateOwner', async (req: Request, res: Response) => {
    let updatingOwner: UpdatingOwner = req.body;
    let response = await db.ownerTasks.updateOwner(/*req.userId*/updatingOwner.id, updatingOwner);
    if (typeof (response) !== 'string') {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: response });
    }
});

router.post('/ownerMissedDays', async (req: Request, res: Response) => {

    let response = await db.calculationTasks.getClientextraMinutes(/*req.userId*/req.body.id, req.body.from, req.body.to);

    res.json({ response });

});

router.get('/calculate/:id/:from/:to', async (req: Request, res: Response) => {

    let response = await utils.utilities.calculateClients(req.params.id, req.params.from, req.params.to);
    res.json(response);

});





export default router;