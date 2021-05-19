import uploadConfig from '@config/upload';
import Paginator from '@shared/infra/http/middlewares/Paginator';
import { Router } from 'express';
import multer from 'multer';
import ProfileController from '../controllers/ProfileController';
import UsersControllers from '../controllers/UsersController';
import ensureAuth from '../middlewares/ensureAuth';

const userRouter = Router();
const upload = multer(uploadConfig.multer)
const userController = new UsersControllers();
const profileController = new ProfileController()

userRouter.post('/', userController.create);

userRouter.use(ensureAuth);

userRouter.get('/', Paginator, userController.index);

userRouter.get('/:id', userController.show);

userRouter.delete('/:id', userController.delete)

userRouter.get('/profile', profileController.show)

export default userRouter;
