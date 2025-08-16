import React from 'react';
import { Navigation, Flame, Camera, Music } from 'lucide-react';
import { t } from '../../i18n/translations';

interface BookingActivity {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  icon: string;
}

interface BookingSectionProps {
  onBookActivity: (activityId: string) => void;
  currentLang: string;
}

const BookingSection: React.FC<BookingSectionProps> = ({ onBookActivity, currentLang }) => {
  const activities: BookingActivity[] = [
    {
      id: 'boat-rides',
      title: t('events.activity.boat_rides', currentLang),
      description: t('events.activity.boat_rides_desc', currentLang),
      priceRange: '₹300-800',
      icon: 'navigation'
    },
    {
      id: 'spiritual-tours',
      title: t('events.booking.spiritual_tours', currentLang),
      description: t('events.booking.spiritual_tours_desc', currentLang),
      priceRange: '₹1500-5000',
      icon: 'flame'
    },
    {
      id: 'photography-tours',
      title: t('events.booking.photography_tours', currentLang),
      description: t('events.booking.photography_tours_desc', currentLang),
      priceRange: '₹2000-4000',
      icon: 'camera'
    },
    {
      id: 'cultural-programs',
      title: t('events.booking.cultural_programs', currentLang),
      description: t('events.booking.cultural_programs_desc', currentLang),
      priceRange: '₹500-1200',
      icon: 'music'
    }
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      navigation: Navigation,
      flame: Flame,
      camera: Camera,
      music: Music
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Navigation;
    return <IconComponent className="w-6 h-6 text-white" />;
  };

  return (
    <section className="py-16 bg-gradient-to-r from-emerald-600 to-lime-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('events.booking.title', currentLang)}</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t('events.booking.subtitle', currentLang)}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all cursor-pointer"
              onClick={() => onBookActivity(activity.id)}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                {getIcon(activity.icon)}
              </div>
              <h3 className="text-lg font-semibold mb-2">{activity.title}</h3>
              <p className="text-blue-100 text-sm mb-4">{activity.description}</p>
              <div className="text-2xl font-bold mb-2">{activity.priceRange}</div>
              <button className="w-full bg-white text-lime-700 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                {t('events.ui.book_now', currentLang)}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-blue-100 mb-4">{t('events.booking.includes_note', currentLang)}</p>
          <button className="bg-white text-lime-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            {t('events.booking.contact_custom', currentLang)}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;