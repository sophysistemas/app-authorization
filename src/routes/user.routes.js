import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authJwt, verifySignup } from '../middlewares';

const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRoleExisted, verifySignup.checkDuplicateUsernameOrEmail], userController.createUser);

export default userRouter;