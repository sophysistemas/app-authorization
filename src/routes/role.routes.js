import { Router } from 'express';
import * as roleController from '../controllers/role.controller';

const roleRouter = Router();

roleRouter.get('/', roleController.getRoles);

export default roleRouter;