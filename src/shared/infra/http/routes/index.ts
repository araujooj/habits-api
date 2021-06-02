import { Router } from 'express';
import UserRouter from '@modules/users/infra/http/routes/users.routes';
import SessionRouter from '@modules/users/infra/http/routes/session.routes';
import ProfileRouter from '@modules/users/infra/http/routes/profile.routes';
import GroupRouter from '@modules/groups/infra/http/routes/group.routes';
import SubscriptionRouter from '@modules/groups/infra/http/routes/subscription.routes';
import EventRouter from '@modules/events/infra/http/routes/event.routes';

const routes = Router();

routes.use('/sessions', SessionRouter);
routes.use('/users', UserRouter);
routes.use('/profile', ProfileRouter);
routes.use('/groups', GroupRouter);
routes.use('/subscriptions', SubscriptionRouter);
routes.use('/events', EventRouter);

export default routes;
