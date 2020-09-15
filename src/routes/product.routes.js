import { Router } from 'express';
import * as productController from '../controllers/products.controller';
import { authJwt } from '../middlewares';

const productRouter = Router();

productRouter.get('/', productController.getProducts);
productRouter.get('/:product_id', productController.getProductById);
productRouter.post('/', [authJwt.verifyToken, authJwt.isModerator], productController.createProduct);
productRouter.put('/:product_id', [authJwt.verifyToken, authJwt.isAdmin], productController.updateProductById);
productRouter.delete('/:product_id', [authJwt.verifyToken, authJwt.isAdmin], productController.deleteProductById);

export default productRouter;