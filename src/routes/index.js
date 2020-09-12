import { Router } from 'express';
import appInfo from '../../package.json';

import productoRouter from './product.routes';
import userRouter from './user.routes';
import authRouter from './auth.routes';

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
routes.use('/users', userRouter);
routes.use('/auth', authRouter);


export default routes;