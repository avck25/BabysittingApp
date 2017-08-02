
import * as express from 'express-promise-router';
const authRouter = express();
import companies from './companies';


authRouter.use('/companies', companies);


export { authRouter }

