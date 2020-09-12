import Product from '../models/Product';
import { json } from 'express';

export const createProduct = async (request, response) => {
  const { name, category, price, imageURL } = request.body;
  
  const product = new Product({
    name,
    category,
    price,
    imageURL,
  });

  await product.save();

  return response.status(201).json(product);
}

export const getProducts = async (request, response) => {
  const products = await Product.find();

  response.status(200).json(products);
}

export const getProductById = async (request, response) => {
  const { product_id } = request.params;

  const product = await Product.findById(product_id);

  return response.json(product);
  
}

export const updateProductById = async (request, response) => {
  const { product_id } = request.params;

  const product = await Product.findByIdAndUpdate(product_id, request.body, {
    new: true,
  });

  return response.json(product);
}

export const deleteProductById = async (request, response) => {
  const { product_id } = request.params;

  const product = await Product.findOneAndDelete(product_id);

  return response.json( { OK: 'Produto elimiado' });
}