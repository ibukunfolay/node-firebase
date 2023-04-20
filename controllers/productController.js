const firebase = require('../db');
const Product = require('../models/productModel');
const firestore = firebase.firestore();

const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection('products').doc().set(data);
    res.status(200).send('product created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await firestore.collection('products').doc(id);
    const data = await product.get();
    if (!data.exists) {
      res.status(404).send('product not found');
    } else {
      res.status(200).send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await firestore.collection('students');
    const data = await products.get();
    const productArray = [];

    if (data.empty) {
      res.status(400).send('No Products found');
    } else {
      data.forEach((doc) => {
        const product = new Product(
          doc.id,
          doc.data().id,
          doc.data().name,
          doc.data().price,
          doc.data().retailer,
          doc.data().amountInStock,
        );
        productArray.push(product);
      });

      res.status(200).send(productArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const product = await firestore.collection('products').doc(id);
    await product.update(data);
    res.status(200).send('product updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await firestore.collection('products').doc(id);
    await product.delete();
    res.status(200).send('product deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
