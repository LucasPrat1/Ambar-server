import express from 'express';
import productRouter from './productRoutes.js';
import userRouter from './userRoutes.js';
import orderRouter from './orderRoutes.js';

const router = express.Router();

router
  .use('/products', productRouter)
  .use('/users', userRouter)
  .use('/orders', orderRouter)


export default router