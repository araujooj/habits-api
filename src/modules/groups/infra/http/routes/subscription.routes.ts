import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import { Router } from 'express';
import SubscriptionController from '../controllers/SubscriptionController';

const SubscriptionRouter = Router();

const subscriptionController = new SubscriptionController();

SubscriptionRouter.use(ensureAuth);

SubscriptionRouter.post('/:id', subscriptionController.store);

export default SubscriptionRouter;
