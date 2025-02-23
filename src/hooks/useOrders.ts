import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  items: OrderItem[];
  total_amount: number;
  status: 'new' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
        return;
      }

      setOrders(data || []);
      setError(null);
    } catch (error) {
      console.error('Error in fetchOrders:', error);
      setError('Failed to fetch orders');
    }
  }

  async function updateOrderStatus(id: string, status: Order['status']) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);

      if (error) {
        console.error('Error updating order status:', error);
        setError(error.message);
        return;
      }

      await fetchOrders();
      setError(null);
    } catch (error) {
      console.error('Error in updateOrderStatus:', error);
      setError('Failed to update order status');
    }
  }

  return {
    orders,
    error,
    updateOrderStatus
  };
}