import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import EventBookingForm from '../EventBookingForm';
import { t } from '../../i18n/translations';

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time?: string;
  location: string;
  price: number;
  currency: string;
  capacity: number;
  registered: number;
  organizer: string;
  tags: string[];
  image?: string;
  featured?: boolean;
}

interface EventsGridProps {
  events?: Event[];
  title: string;
  description?: string;
  showViewAll?: boolean;
  limit?: number;
  currentLang: string;
}

const EventsGrid: React.FC<EventsGridProps> = ({ 
  events = [], 
  title, 
  description, 
  showViewAll = false, 
  limit,
  currentLang 
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Calculate displayEvents directly without state
  const displayEvents = React.useMemo(() => {
    if (!events || !Array.isArray(events)) {
      return [];
    }
    return limit ? events.slice(0, limit) : events;
  }, [events, limit]);

  const handleBookEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseBooking = () => {
    setSelectedEvent(null);
  };

  if (displayEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
        <p className="text-gray-500">Check back later for upcoming events.</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onBook={handleBookEvent}
              currentLang={currentLang}
            />
          ))}
        </div>

        {showViewAll && limit && events.length > limit && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              {t('events.ui.view_all_events', currentLang)} ({events.length})
            </button>
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventBookingForm
          event={selectedEvent}
          onClose={handleCloseBooking}
        />
      )}
    </section>
  );
};

export default EventsGrid;