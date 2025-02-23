import React, { useState } from 'react';
import { useEvents } from '../../hooks/useEvents';
import { Pencil, Trash2, Plus, MapPin } from 'lucide-react';

const AdminEvents = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    id: '',
    title: '',
    address: '',
    maps_url: '',
    image_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentEvent.id) {
      await updateEvent(currentEvent);
    } else {
      await addEvent(currentEvent);
    }
    setIsEditing(false);
    setCurrentEvent({ id: '', title: '', address: '', maps_url: '', image_url: '' });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle image upload to Supabase storage
      // Update currentEvent.image_url with the uploaded image URL
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Zarządzaj Wydarzeniami</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Dodaj Wydarzenie
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tytuł</label>
            <input
              type="text"
              value={currentEvent.title}
              onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Adres</label>
            <input
              type="text"
              value={currentEvent.address}
              onChange={(e) => setCurrentEvent({ ...currentEvent, address: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Link do Google Maps</label>
            <input
              type="url"
              value={currentEvent.maps_url}
              onChange={(e) => setCurrentEvent({ ...currentEvent, maps_url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="https://www.google.com/maps?q=..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Zdjęcie</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setCurrentEvent({ id: '', title: '', address: '', maps_url: '', image_url: '' });
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900"
            >
              {currentEvent.id ? 'Zapisz zmiany' : 'Dodaj wydarzenie'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{event.title}</h3>
                <div className="flex items-center text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{event.address}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setCurrentEvent(event);
                    setIsEditing(true);
                  }}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="p-2 text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEvents;