import React from 'react';
import { useOrders } from '../../hooks/useOrders';
import { Phone, User, Package, Clock, AlertCircle } from 'lucide-react';

const AdminOrders = () => {
  const { orders, error, updateOrderStatus } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'Nowe';
      case 'processing':
        return 'W realizacji';
      case 'completed':
        return 'Zrealizowane';
      case 'cancelled':
        return 'Anulowane';
      default:
        return status;
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
          <AlertCircle className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Error loading orders</h2>
        </div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-serif mb-4">Brak zamówień</h2>
        <p className="text-gray-600">Nie ma jeszcze żadnych zamówień w systemie.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Zarządzaj Zamówieniami</h2>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">{order.customer_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <a href={`tel:${order.customer_phone}`} className="text-green-800 hover:text-green-900">
                    {order.customer_phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-gray-500">
                  {new Date(order.created_at).toLocaleDateString('pl-PL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>

            <div className="border-t border-b py-4 my-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Zamówione produkty
              </h3>
              <div className="space-y-2">
                {Array.isArray(order.items) && order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.title} × {item.quantity}</span>
                    <span className="text-gray-600">{(item.price * item.quantity).toFixed(2)} zł</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between items-center font-semibold">
                <span>Razem</span>
                <span>{Number(order.total_amount).toFixed(2)} zł</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
              <div className="flex gap-2">
                {order.status === 'new' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'processing')}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Przyjmij do realizacji
                  </button>
                )}
                {order.status === 'processing' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Oznacz jako zrealizowane
                  </button>
                )}
                {(order.status === 'new' || order.status === 'processing') && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Anuluj
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;