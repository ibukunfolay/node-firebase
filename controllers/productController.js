import firebase from '../firebase.js';
import Product from '../models/productModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

//create new product

export const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'products'), data);
    res.status(200).send('product created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//get get all products

export const getProducts = async (req, res, next) => {
  try {
    const products = await getDocs(collection(db, 'products'));
    const productArray = [];

    if (products.empty) {
      res.status(400).send('No Products found');
    } else {
      products.forEach((doc) => {
        const product = new Product(
          doc.id,
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

//get product by id

export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = doc(db, 'products', id);
    const data = await getDoc(product);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('product not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//update product (with id)

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const product = doc(db, 'products', id);
    await updateDoc(product, data);
    res.status(200).send('product updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//delete product (with id)

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'products', id));
    res.status(200).send('product deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
