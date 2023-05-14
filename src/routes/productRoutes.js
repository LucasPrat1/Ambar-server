import express from 'express';
import productsControllers from '../controllers/products.js';

const productRouter = express.Router();

productRouter
  .get('/', productsControllers.getAllProducts)
  .post('/', productsControllers.createProduct)
  .put('/:id', productsControllers.updateProduct)
  .delete('/:id', productsControllers.deleteProduct)
  .get('/:id', productsControllers.getProductById);

export default productRouter;