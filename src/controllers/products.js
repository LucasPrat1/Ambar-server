import Product from '../models/productModel.js';
import { bucket } from '../firebase/index.js';
import { extname } from 'path'

const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({
        message: 'image not found',
        data: undefined,
        error: true,
      });
    }

    const fileExtension = extname(req.file.originalname);
    const fileName = `img-${Date.now()}${fileExtension}`;

    const file = bucket.file(fileName);
    const stream = file.createWriteStream();
    const resp = stream.end(req.file.buffer);

    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileName}?alt=media`;

    if (resp.error) {
      return res.status(400).json({
        message: resp.message,
        data: undefined,
        error: true,
      });
    }

    const newProduct = new Product({
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      rating: req.body.rating,
      image: imageUrl,
      status: true,
    });
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

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).json({
      message: 'Products found',
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
        message: 'Invalid params',
        data: req.params.id,
        error: true,
      });
    }
    if (!result) {
      return res.status(404).json({
        message: 'Product not found',
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