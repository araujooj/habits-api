import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import Paginator from '@shared/infra/http/middlewares/Paginator';
import { Router } from 'express';
import GroupController from '../controllers/GroupController';

const GroupRouter = Router();

const groupController = new GroupController();

GroupRouter.use(ensureAuth);

GroupRouter.post('/', groupController.store);

GroupRouter.get('/', Paginator, groupController.index);

GroupRouter.put('/:id', groupController.update);

GroupRouter.delete('/:id', groupController.destroy);

export default GroupRouter;
