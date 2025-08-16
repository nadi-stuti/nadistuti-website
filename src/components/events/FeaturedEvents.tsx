import React from 'react';
import { Flame, Globe, Calendar } from 'lucide-react';
import { t } from '../../i18n/translations';

interface FeaturedEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  schedule?: string;
  duration?: string;
  frequency?: string;
  locations?: string[];
  organizer: string;
  tags: string[];
  image?: string;
}

interface FeaturedEventsProps {
  featuredEvents: FeaturedEvent[];
  onLearnMore: (eventId: string) => void;
  currentLang: string;
}

const FeaturedEvents: React.FC<FeaturedEventsProps> = ({ featuredEvents, onLearnMore, currentLang }) => {
  const getEventTypeInfo = (event: FeaturedEvent) => {
    if (event.schedule) return event.schedule;
    if (event.duration) return event.duration;
    if (event.frequency) return event.frequency;
    return 'Ongoing';
  };

  const getEventIcon = (type: string) => {
    const icons = {
      recurring: Calendar,
      pilgrimage: Globe,
      festival: Flame
    };
    const IconComponent = icons[type as keyof typeof icons] || Calendar;
    return <IconComponent className="w-16 h-16 mx-auto mb-4" />;
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      'from-orange-400 to-red-500',
      'from-green-400 to-blue-500',
      'from-purple-400 to-pink-500'
    ];
    return gradients[index % gradients.length];
  };

  const getBadgeColor = (type: string) => {
    const colors = {
      recurring: 'bg-orange-100 text-orange-800',
      pilgrimage: 'bg-green-100 text-green-800',
      festival: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getLinkColor = (type: string) => {
    const colors = {
      recurring: 'text-orange-600 hover:text-orange-700',
      pilgrimage: 'text-green-600 hover:text-green-700',
      festival: 'text-purple-600 hover:text-purple-700'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 hover:text-gray-700';
  };

  // Split featured events into main events and other events
  const mainEvents = featuredEvents.slice(0, 2);
  const otherEvents = featuredEvents.slice(2);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('events.featured_spiritual.title', currentLang)}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('events.featured_spiritual.subtitle', currentLang)}
          </p>
        </div>

        {/* Main Featured Events */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {mainEvents.map((event, index) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className={`h-64 bg-gradient-to-r ${getGradientClass(index)} flex items-center justify-center`}>
                <div className="text-center text-white">
                  {getEventIcon(event.type)}
                  <h3 className="text-2xl font-bold">{event.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getBadgeColor(event.type)}`}>
                    {getEventTypeInfo(event)}
                  </span>
                  {event.locations && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {event.locations.length} Cities
                    </span>
                  )}
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {event.category}
                  </span>
                </div>
                <button 
                  onClick={() => onLearnMore(event.id)}
                  className={`font-medium ${getLinkColor(event.type)}`}
                >
                  {t('events.ui.learn_more', currentLang)} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Other Major Events */}
        {otherEvents.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {otherEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                <span className={`text-xs px-2 py-1 rounded ${getBadgeColor(event.type)}`}>
                  {getEventTypeInfo(event)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;