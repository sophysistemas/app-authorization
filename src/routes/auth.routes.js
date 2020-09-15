import { Router } from 'express';
import * as authController from '../controllers/auth.controller'
import { verifySignup } from '../middlewares';

const authRouter = Router();

authRouter.post('/signup', [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRoleExisted], authController.singUp);
authRouter.post('/signin', authController.singIn);

export default authRouter;