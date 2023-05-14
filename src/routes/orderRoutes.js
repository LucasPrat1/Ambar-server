import express from 'express';
import orderController from '../controllers/orders.js';

const orderRouter = express.Router();

orderRouter
  .get('/', orderController.getAllOrders)
  .post('/', orderController.createOrder)
  .put('/:id', orderController.updateOrder)
  .delete('/:id', orderController.deleteOrder)
  .get('/:id', orderController.getOrderById);

export default orderRouter;