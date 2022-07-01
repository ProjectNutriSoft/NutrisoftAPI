import { Router } from 'express';
import authRouter from './auth.route';
import clientRouter from './client.route';
import foodRouter from './food.route';
import meetingRouter from './meeting.route';
import nutriRouter from './nutri.route';
import suscriptionRouter from './suscription.route';

// Export the base-router
const baseRouter = Router();

// Setup routers
//baseRouter.use('/users', userRouter);
baseRouter.use('/foods', foodRouter);
baseRouter.use('/clients', clientRouter);
baseRouter.use('/nutris', nutriRouter);
baseRouter.use('/suscriptions', suscriptionRouter);
baseRouter.use('/meetings', meetingRouter);
baseRouter.use('/auth', authRouter);

// Export default.
export default baseRouter;