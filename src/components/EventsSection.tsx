import React from 'react';
import { useEvents } from '../hooks/useEvents';
import { MapPin } from 'lucide-react';

const EventsSection = () => {
  const { events } = useEvents();

  return (
    <section className="py-20 bg-gray-50" id="events">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-gray-900 mb-12 text-center">Nadchodzące Wydarzenia</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={event.image_url} 
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="flex items-start gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-gray-600">{event.address}</p>
                    <a 
                      href={event.maps_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-800 hover:text-green-900 text-sm"
                    >
                      Zobacz na mapie →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;