import { Router } from 'express';
import * as authController from '../controllers/auth.controller'

const authRouter = Router();

authRouter.post('/signup', authController.singUp);
authRouter.post('/signin', authController.singIn);

export default authRouter;