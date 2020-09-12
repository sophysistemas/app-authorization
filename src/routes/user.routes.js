import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (request, response) => {
  return response.send('User Index');
})

export default userRouter;