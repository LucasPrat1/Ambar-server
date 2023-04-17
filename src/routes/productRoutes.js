import express from 'express';
import productsControllers from '../controllers/products.js';

const productRouter = express.Router();

//   .put('/:id', projectsValidation.validateUpdate, projectsController.updateProject)
productRouter
  .put('/:id', productsControllers.updateProduct)
  .delete('/:id', productsControllers.deleteProduct)
  .get('/', productsControllers.getAllProducts)
  .post('/', productsControllers.createProduct)
  .get('/:id', productsControllers.getProductById);

export default productRouter;