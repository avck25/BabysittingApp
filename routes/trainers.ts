import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import { Trainer } from '../types/trainer';
import { Client } from '../types/client';
import * as utils from '../utils';


import { Request, Response } from 'express';

router.post('/addTrainer', async (req: Request, res: Response) => {
    let hash = utils.utilities.createRandomToken(32);
    let trainer: Trainer = req.body.trainer;
    trainer.isVerified = false;
    trainer.tempToken = hash;

    await db
        .trainerTasks
        .addTrainer(trainer);

    let htmlString = '<a href="http://localhost:3000/verifyToken/' + trainer.tempToken + '"> verify account </a>'; // html body
    utils
        .utilities
        .verifyEmail(trainer.email, htmlString);
    res.json('success');

});

router.get('/compareTempToken/:tempToken', async (req: Request, res: Response) => {
    let result = await db
        .trainerTasks
        .verifyTempToken(req.params.tempToken);
    if (result) {
        await db
            .trainerTasks
            .verifyTrainer(result.id);

        res.json({ success: true });
    } else {
        res.json({ success: false })
    }

});

router.get('/getClients/:id', async (req: Request, res: Response) => {
    let clients: Array<Client> = await db
        .trainerTasks
        .getClients(req.params.id);

    res.json(clients);

});

router.get('/getTrainer/:id', async (req: Request, res: Response) => {
    let trainer: Trainer = await db
        .trainerTasks
        .getTrainer(req.params.id);

    res.json(trainer);
});



router.delete('/deleteTrainer/:id', async (req: Request, res: Response) => {
    await db
        .trainerTasks
        .deleteTrainer(req.params.id);

    res.send('successfully deleted');
})
export default router;