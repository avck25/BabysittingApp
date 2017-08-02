import * as express from 'express-promise-router';
const router = express();
import companies from './companies';
import clients from './clients';
import packages from './packages';
import trainers from './trainers';
import sessions from './sessions';
import appointments from './appointments';
import advancedBooking from './advancedBooking';
import notifications from './notifications';

router.use('/companies', companies);
router.use('/clients', clients);
router.use('/packages', packages);
router.use('/sessions', sessions);
router.use('/trainers', trainers);
router.use('/appointments', appointments);
router.use('/advancedBooking', advancedBooking);
router.use('/notifications', notifications);


export { router };
