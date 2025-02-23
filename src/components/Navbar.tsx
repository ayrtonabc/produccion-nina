import React, { useState, useEffect } from 'react';
import { Phone, ShoppingCart } from 'lucide-react';
import { useCart } from '../lib/cartContext';

const Navbar = () => {
  const { state, dispatch } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // Estado para controlar si el navbar está fijo o transparente
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para manejar el scroll suave
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-green-700' : 'bg-transparent'
      }`}
      style={isScrolled ? { color: 'white' } : { color: 'black' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Logo"
              className={`h-24 w-24 mt-4 ${isScrolled ? 'mt-10' : 'mt-10'}`}
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
              className="text-white hover:text-gray-300"
            >
              O nas
            </a>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('products');
              }}
              className="text-white hover:text-gray-300"
            >
              Produkty
            </a>
            <a
              href="#recipes"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('recipes');
              }}
              className="text-white hover:text-gray-300"
            >
              Przepisy
            </a>
            <a
              href="#events"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('events');
              }}
              className="text-white hover:text-gray-300"
            >
              Wydarzenia
            </a>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full flex items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Zadzwoń
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="relative text-white hover:text-gray-300"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="relative text-white hover:text-gray-300"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;