import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import {Request, Response} from 'express';
import {InitiateCompany} from '../types/initiateCompany';


router.post('/createCompany', async(req : Request, res : Response) => {
    let company : InitiateCompany = req.body;
    let result = await db
        .companyTasks
        .createCompany(company);
    let id = result[0];
    res.json(id);
});


export default router;