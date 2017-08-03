
import * as express from 'express-promise-router';
const authRouter = express();
import owner from './owner';
import login from './login';

authRouter.use('/owner', owner);
authRouter.use('/login', login);

export { authRouter }

