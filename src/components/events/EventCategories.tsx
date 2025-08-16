import React from 'react';
import { Heart, Book, Flame, Navigation, Users, Star } from 'lucide-react';
import { t } from '../../i18n/translations';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

interface EventCategoriesProps {
  categories: Record<string, Category>;
  onCategoryClick?: (categoryId: string) => void;
  currentLang: string;
}

const EventCategories: React.FC<EventCategoriesProps> = ({ categories, onCategoryClick, currentLang }) => {
  const getIcon = (iconName: string) => {
    const icons = {
      heart: Heart,
      book: Book,
      flame: Flame,
      navigation: Navigation,
      users: Users,
      star: Star
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Heart;
    return <IconComponent className="w-6 h-6 text-white" />;
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: {
        bg: 'bg-green-50',
        iconBg: 'bg-green-500',
        link: 'text-green-600 hover:text-green-700'
      },
      blue: {
        bg: 'bg-blue-50',
        iconBg: 'bg-blue-500',
        link: 'text-blue-600 hover:text-blue-700'
      },
      orange: {
        bg: 'bg-orange-50',
        iconBg: 'bg-orange-500',
        link: 'text-orange-600 hover:text-orange-700'
      },
      purple: {
        bg: 'bg-purple-50',
        iconBg: 'bg-purple-500',
        link: 'text-purple-600 hover:text-purple-700'
      },
      pink: {
        bg: 'bg-pink-50',
        iconBg: 'bg-pink-500',
        link: 'text-pink-600 hover:text-pink-700'
      },
      yellow: {
        bg: 'bg-yellow-50',
        iconBg: 'bg-yellow-500',
        link: 'text-yellow-600 hover:text-yellow-700'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.green;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('events.categories.title', currentLang)}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('events.categories.subtitle', currentLang)}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categories).map(([categoryId, category]) => {
            const colors = getColorClasses(category.color);
            
            return (
              <div 
                key={categoryId}
                className={`${colors.bg} rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer`}
                onClick={() => onCategoryClick?.(categoryId)}
              >
                <div className={`w-12 h-12 ${colors.iconBg} rounded-full flex items-center justify-center mb-4`}>
                  {getIcon(category.icon)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t(`events.${categoryId}.title`, currentLang)}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t(`events.${categoryId}.description`, currentLang)}
                </p>
                <button className={`${colors.link} font-medium`}>
                  {t('events.ui.learn_more', currentLang)} →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventCategories;