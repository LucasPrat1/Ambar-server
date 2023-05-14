import orderModel from '../models/orderModel.js';

const createOrder = async (req, res) => {
  try {
    const newOrder = await new orderModel(req.body);
    const order = await newOrder.save();
    return res.status(201).json({
      message: 'Order created',
      data: order,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await orderModel.find({}).populate('user').populate('items.product');
    return res.status(200).json({
      message: 'Orders found',
      data: allOrders,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    if (req.params.id) {
      const order = await orderModel.findById(req.params.id).populate('user').populate('items.product');
      if (!order) {
        return res.status(404).json({
          message: 'Order not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Order found',
        data: order,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Invalid params',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const result = await orderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    ).populate('user').populate('items.product');
    if (!req.params) {
      return res.status(404).json({
        message: 'Invalid params',
        data: req.params,
        error: true,
      });
    }
    if (!result) {
      return res.status(404).json({
        message: 'Order not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Order has been successfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const result = await orderModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Order not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};