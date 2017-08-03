import * as express from 'express-promise-router';
const router = express();

import owner from './owner';
import clients from './clients';
import hours from './hours';



router.use('/owner', owner);
router.use('/clients', clients);
router.use('/hours', hours);



export { router };
