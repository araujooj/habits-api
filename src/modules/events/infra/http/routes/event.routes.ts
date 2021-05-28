import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import Paginator from '@shared/infra/http/middlewares/Paginator';
import { Router } from 'express';
import EventController from '../controllers/EventController';

const EventRouter = Router();

const eventController = new EventController();

EventRouter.use(ensureAuth);

EventRouter.post('/', eventController.store);

EventRouter.get('/', Paginator, eventController.index);

EventRouter.put('/:id', eventController.update);

EventRouter.delete('/:id', eventController.destroy);

export default EventRouter;
