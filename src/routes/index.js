import { Router } from 'express';
import appInfo from '../../package.json';

import productoRouter from './product.routes';
import authRouter from './auth.routes';
import roleRouter from './role.routes';
import userRouter from './user.routes';

const routes = Router();

const { name, author, version, description } = appInfo;

routes.get('/', (request, response) => {
  return response.json({
    name,
    author,
    version,
    description,
  });
})

routes.use('/products', productoRouter);
routes.use('/auth', authRouter);
routes.use('/roles', roleRouter);
routes.use('/users', userRouter);

export default routes;