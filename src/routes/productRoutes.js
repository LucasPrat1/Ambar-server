import express from 'express';
import productsControllers from '../controllers/products.js';
import multerUpload from '../storage/index.js';

const productRouter = express.Router();

productRouter
  .get('/', productsControllers.getAllProducts)
  .post('/', multerUpload.single('image') , productsControllers.createProduct)
  .put('/:id', multerUpload.single('image') , productsControllers.updateProduct)
  .delete('/:id', productsControllers.deleteProduct)
  .get('/:id', productsControllers.getProductById);

export default productRouter;