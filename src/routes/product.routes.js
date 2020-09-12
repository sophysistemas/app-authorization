import { Router } from 'express';
import * as productController from '../controllers/products.controller';

const productRouter = Router();

productRouter.get('/', productController.getProducts);
productRouter.get('/:product_id', productController.getProductById);
productRouter.post('/', productController.createProduct);
productRouter.put('/:product_id', productController.updateProductById);
productRouter.delete('/:product_id', productController.deleteProductById);

export default productRouter;