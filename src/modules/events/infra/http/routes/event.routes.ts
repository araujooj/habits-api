import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import Paginator from '@shared/infra/http/middlewares/Paginator';
import { Router } from 'express';
import EventController from '../controllers/EventController';

const EventRouter = Router();

const eventController = new EventController();

EventRouter.use(ensureAuth);

EventRouter.post('/:group_id', eventController.store);

EventRouter.get('/:group_id', Paginator, eventController.index);

EventRouter.put('/:group_id/:event_id', eventController.update);

EventRouter.delete('/:group_id/:event_id', eventController.destroy);

export default EventRouter;
