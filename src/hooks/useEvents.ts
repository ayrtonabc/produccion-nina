import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Event {
  id: string;
  title: string;
  address: string;
  maps_url: string;
  image_url: string;
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
      return;
    }

    setEvents(data || []);
  }

  async function addEvent(event: Omit<Event, 'id'>) {
    const { error } = await supabase
      .from('events')
      .insert([event]);

    if (error) {
      console.error('Error adding event:', error);
      return;
    }

    fetchEvents();
  }

  async function updateEvent(event: Event) {
    const { error } = await supabase
      .from('events')
      .update(event)
      .eq('id', event.id);

    if (error) {
      console.error('Error updating event:', error);
      return;
    }

    fetchEvents();
  }

  async function deleteEvent(id: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
      return;
    }

    fetchEvents();
  }

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent
  };
}