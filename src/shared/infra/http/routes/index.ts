import { Router } from 'express';
import UserRouter from '@modules/users/infra/http/routes/users.routes'
import SessionRouter from '@modules/users/infra/http/routes/session.routes'
import ProfileRouter from '@modules/users/infra/http/routes/profile.routes'
import studentRouter from '@modules/students/infra/http/routes/students.routes';
import perceptionRouter from '@modules/perceptions/infra/http/routes/perceptions.routes';

const routes = Router();

routes.use('/sessions', SessionRouter)
routes.use('/users', UserRouter)
routes.use('/profile', ProfileRouter)
routes.use('/students', studentRouter)
routes.use('/perceptions', perceptionRouter)

export default routes;
