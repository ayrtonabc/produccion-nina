import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Settings, Package, BookOpen, Calendar, ShoppingBag, LogIn } from 'lucide-react';
import { supabase, isAdmin } from '../../lib/supabaseClient';
import AdminProducts from './AdminProducts';
import AdminRecipes from './AdminRecipes';
import AdminEvents from './AdminEvents';
import AdminOrders from './AdminOrders';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isAdminUser = await isAdmin();
      setIsAuthenticated(isAdminUser);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');
    
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `${username}@admin.com`, // Usamos un email ficticio basado en el username
        password
      });
      
      if (error) throw error;
      
      const adminCheck = await isAdmin();
      if (!adminCheck) {
        await supabase.auth.signOut();
        throw new Error('No tienes permisos de administrador');
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Credenciales inválidas');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-800"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-serif mb-6 text-center">Panel Administracyjny</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <input
                type="text"
                name="username"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            {loginError && (
              <p className="text-red-600 text-sm text-center">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-900 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Settings className="w-6 h-6 text-gray-500" />
              <span className="ml-2 font-semibold">Panel Administracyjny</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-green-800 hover:text-green-900">
                ← Powrót do strony głównej
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="space-y-2">
            <Link
              to="/edit/orders"
              className={`flex items-center space-x-2 p-3 rounded-lg ${
                location.pathname === '/edit/orders' 
                  ? 'bg-green-800 text-white' 
                  : 'hover:bg-gray-200'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Zamówienia</span>
            </Link>
            <Link
              to="/edit/products"
              className={`flex items-center space-x-2 p-3 rounded-lg ${
                location.pathname === '/edit/products' 
                  ? 'bg-green-800 text-white' 
                  : 'hover:bg-gray-200'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Produkty</span>
            </Link>
            <Link
              to="/edit/recipes"
              className={`flex items-center space-x-2 p-3 rounded-lg ${
                location.pathname === '/edit/recipes' 
                  ? 'bg-green-800 text-white' 
                  : 'hover:bg-gray-200'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Przepisy</span>
            </Link>
            <Link
              to="/edit/events"
              className={`flex items-center space-x-2 p-3 rounded-lg ${
                location.pathname === '/edit/events' 
                  ? 'bg-green-800 text-white' 
                  : 'hover:bg-gray-200'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Wydarzenia</span>
            </Link>
          </aside>

          <main className="md:col-span-3 bg-white rounded-lg shadow p-6">
            <Routes>
              <Route path="/orders" element={<AdminOrders />} />
              <Route path="/products" element={<AdminProducts />} />
              <Route path="/recipes" element={<AdminRecipes />} />
              <Route path="/events" element={<AdminEvents />} />
              <Route path="/" element={
                <div className="text-center py-12">
                  <h2 className="text-2xl font-serif mb-4">Witaj w panelu administracyjnym</h2>
                  <p className="text-gray-600">Wybierz sekcję z menu po lewej stronie.</p>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;