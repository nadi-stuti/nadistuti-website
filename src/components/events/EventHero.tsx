import React from 'react';
import { Calendar, Ticket } from 'lucide-react';
import { t } from '../../i18n/translations';

interface EventHeroProps {
  title: string;
  description: string;
  onViewUpcoming: () => void;
  onBookActivities: () => void;
  currentLang: string;
}

const EventHero: React.FC<EventHeroProps> = ({ 
  title, 
  description, 
  onViewUpcoming, 
  onBookActivities,
  currentLang 
}) => {
  return (
    <section className="py-16 bg-gradient-to-r from-emerald-600 to-lime-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Calendar className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onViewUpcoming}
              className="bg-white text-lime-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              {t('events.hero.view_upcoming', currentLang)}
            </button>
            <button 
              onClick={onBookActivities}
              className="bg-lime-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-lime-900 transition-all border border-lime-500 flex items-center justify-center gap-2"
            >
              <Ticket className="w-5 h-5" />
              {t('events.hero.book_activities', currentLang)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHero;