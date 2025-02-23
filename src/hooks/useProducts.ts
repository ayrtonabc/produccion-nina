import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image_url: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    setProducts(data || []);
  }

  async function addProduct(product: Omit<Product, 'id'>) {
    const { error } = await supabase
      .from('products')
      .insert([product]);

    if (error) {
      console.error('Error adding product:', error);
      return;
    }

    fetchProducts();
  }

  async function updateProduct(product: Product) {
    const { error } = await supabase
      .from('products')
      .update(product)
      .eq('id', product.id);

    if (error) {
      console.error('Error updating product:', error);
      return;
    }

    fetchProducts();
  }

  async function deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return;
    }

    fetchProducts();
  }

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };
}