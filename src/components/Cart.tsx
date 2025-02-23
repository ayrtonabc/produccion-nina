import React, { useState } from 'react';
import { useCart } from '../lib/cartContext';
import { X, ShoppingCart, Minus, Plus } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface OrderFormData {
  name: string;
  phone: string;
}

const Cart = () => {
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: string, change: number) => {
    const item = state.items.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        dispatch({
          type: 'UPDATE_QUANTITY',
          payload: { id, quantity: newQuantity },
        });
      } else {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { error } = await supabase.from('orders').insert([
        {
          customer_name: formData.name,
          customer_phone: formData.phone,
          items: state.items,
          total_amount: total,
          status: 'new'
        }
      ]);

      if (error) throw error;

      dispatch({ type: 'CLEAR_CART' });
      dispatch({ type: 'TOGGLE_CART' });
      setFormData({ name: '', phone: '' });
    } catch (error) {
      setSubmitError('Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Koszyk
            </h2>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <p className="text-center text-gray-500 mt-8">Twój koszyk jest pusty</p>
            ) : (
              <div className="space-y-4">
                {state.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-green-800">{item.price.toFixed(2)} zł</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state.items.length > 0 && (
            <div className="border-t p-4">
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Razem: {total.toFixed(2)} zł
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Numer telefonu
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                {submitError && (
                  <p className="text-red-600 text-sm">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-800 text-white py-2 px-4 rounded-full hover:bg-green-900 disabled:opacity-50"
                >
                  {isSubmitting ? 'Składanie zamówienia...' : 'Złóż zamówienie'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;