import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
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

interface EventCardProps {
  event: Event;
  onBook: (event: Event) => void;
  currentLang?: string;
}

const EventCard: React.FC<EventCardProps> = ({ event, onBook, currentLang = 'en' }) => {
  const getCategoryGradient = (category: string) => {
    const gradients = {
      conservation: 'from-green-500 to-teal-500',
      spiritual: 'from-orange-500 to-red-500',
      education: 'from-blue-500 to-purple-500',
      tourism: 'from-purple-500 to-pink-500',
      community: 'from-pink-500 to-rose-500'
    };
    return gradients[category as keyof typeof gradients] || 'from-gray-500 to-gray-600';
  };

  const getCategoryBadge = (category: string) => {
    const badges = {
      conservation: 'bg-green-100 text-green-800',
      spiritual: 'bg-orange-100 text-orange-800',
      education: 'bg-blue-100 text-blue-800',
      tourism: 'bg-purple-100 text-purple-800',
      community: 'bg-pink-100 text-pink-800'
    };
    return badges[category as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryButtonClass = (category: string) => {
    const classes = {
      conservation: 'bg-green-600 hover:bg-green-700',
      spiritual: 'bg-orange-600 hover:bg-orange-700',
      education: 'bg-blue-600 hover:bg-blue-700',
      tourism: 'bg-purple-600 hover:bg-purple-700',
      community: 'bg-pink-600 hover:bg-pink-700'
    };
    return classes[category as keyof typeof classes] || 'bg-gray-600 hover:bg-gray-700';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const availableSpots = event.capacity - event.registered;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className={`h-48 bg-gradient-to-r ${getCategoryGradient(event.category)} flex items-center justify-center`}>
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center text-white">
            <Calendar className="w-16 h-16 mx-auto mb-2" />
            <div className="text-sm font-medium">{event.category.toUpperCase()}</div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`${getCategoryBadge(event.category)} text-xs font-medium px-2.5 py-0.5 rounded`}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
          {event.featured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(event.date)}</span>
            {event.time && (
              <>
                <Clock className="w-4 h-4 ml-4 mr-2" />
                <span>{event.time}</span>
              </>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            <span>{availableSpots} spots available</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">
            {event.price === 0 ? 'Free' : `₹${event.price}`}
          </div>
          <button 
            onClick={() => onBook(event)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white ${getCategoryButtonClass(event.category)}`}
            disabled={availableSpots === 0}
          >
            {availableSpots === 0 ? 'Sold Out' : 
             event.price === 0 ? t('events.ui.register_free', currentLang) : `${t('events.ui.book_now', currentLang)} ₹${event.price}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;