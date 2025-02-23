import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './lib/cartContext';
import { Phone, ChevronDown } from 'lucide-react';
import Navbar from './components/Navbar';
import BenefitsBanner from './components/BenefitsBanner';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import RecipesSection from './components/RecipesSection';
import EventsSection from './components/EventsSection';
import AdminDashboard from './components/admin/AdminDashboard';
import RecipeDetailView from './components/RecipeDetailView';
import Cart from './components/Cart';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/edit/*" element={<AdminDashboard />} />
          <Route path="/recipes/:id" element={<RecipeDetailView />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Cart />

     {/* Hero Section */}
<div
className="h-screen relative bg-cover bg-center "
style={{
backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("./images/background3.png")'
}}
>
<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
<h1 className="text-6xl md:text-7xl font-serif mb-4">Przyprawy do życia</h1>
<h2 className="text-2xl md:text-3xl text-yellow-400 font-light mb-6">Nina Fierkowicz</h2>
<p className="text-xl md:text-2xl mb-12 max-w-2xl">
Naturalne przyprawy i zioła, które odmienią Twoją kuchnię
</p>
<div className="flex flex-col sm:flex-row gap-4">

</div>
</div>
<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
<ChevronDown className="w-8 h-8 text-white" />
</div>
</div>

      
      <AboutSection id="about" />
      <ProductsSection id="products" />
      <RecipesSection id="recipes" />
      <EventsSection id="events" />
      <BenefitsBanner />
    </div>
  );
}

export default App;