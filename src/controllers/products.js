import Product from '../models/productModel.js';

const createProduct = async (req, res) => {
  try {
    const prod = req.body;
    const newProduct = await new Product(prod);
    const product = await newProduct.save();
    return res.status(201).json({
      message: 'Product created',
      data: product,
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

// const newProduct = async (req, res) => {
//   const newProduct = new Product({
//     name: 'sample name ' + Date.now(),
//     slug: 'sample-name-' + Date.now(),
//     image: '/images/p1.jpg',
//     price: 0,
//     category: 'sample category',
//     brand: 'sample brand',
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//     description: 'sample description',
//   });
//   const product = await newProduct.save();
//   res.send({ message: 'Product Created', product });
// };



const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).json({
      message: 'Product found',
      data: allProducts,
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

const getProductById = async (req, res) => {
  try {
    if (req.params.id) {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Product found',
        data: product,
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

const updateProduct = async (req, res) => {
  try {
    const result = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!req.params) {
      return res.status(404).json({
        message: 'Product not found',
        data: req.params.id,
        error: true,
      });
    }
    if (!result) {
      return res.status(404).json({
        message: 'Product has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Product has been successfully updated',
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

const deleteProduct = async (req, res) => {
  try {
    const ProductId = await Product.findByIdAndDelete(req.params.id);
    if (!ProductId) {
      return res.status(404).json({
        message: 'Product not found',
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
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};