import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useCart } from '../lib/cartContext';
import { ShoppingCart } from 'lucide-react';

const ProductsSection = () => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const { dispatch } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category_id === selectedCategory)
    : products;

  const handleAddToCart = (product: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        title: product.title,
        price: parseFloat(product.price),
        quantity: 1
      }
    });
    dispatch({ type: 'TOGGLE_CART' });
  };

  return (
    <section className="py-20 bg-gray-50" id="products">
      <div className="max-w-7xl mx-auto px-4">
        <h2 id="products" className="text-4xl font-serif text-gray-900 mb-8 text-center">Nasze Produkty</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full transition-colors duration-200 ${
              selectedCategory === null
                ? 'bg-green-800 text-white'
                : 'bg-white text-gray-700 hover:bg-green-100'
            }`}
          >
            Wszystkie
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-green-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-200">
              <img 
                src={product.image_url} 
                alt={product.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-sm text-green-800 font-medium">
                    {categories.find(c => c.id === product.category_id)?.name}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-800">{product.price} zł</span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Dodaj do koszyka
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;