import axios from 'axios';
import { Product } from '../models/product';

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get('/api/products');
  console.log('📦 productos desde backend:', response.data); // 👈 esto nos ayuda a depurar
  return response.data;
};
