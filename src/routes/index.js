import express from 'express';
import productRouter from './productRoutes.js';
import userRouter from './userRoutes.js';

const router = express.Router();

router
  .use('/products', productRouter)
  .use('/users', userRouter);

export default router