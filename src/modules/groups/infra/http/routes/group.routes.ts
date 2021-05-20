import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import { Router } from 'express';
import GroupController from '../controllers/GroupController';

const GroupRouter = Router();

const groupController = new GroupController();

GroupRouter.use(ensureAuth);

GroupRouter.post('/', groupController.store);

export default GroupRouter;
