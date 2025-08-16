import React from 'react';
import { Mail, MessageCircle, Users, DollarSign } from 'lucide-react';
import { t } from '../../i18n/translations';

interface ContactSectionProps {
  onContactAction: (action: string) => void;
  currentLang: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onContactAction, currentLang }) => {
  const contactOptions = [
    {
      id: 'email',
      title: t('events.contact.email_us', currentLang),
      description: t('events.contact.email_description', currentLang),
      contact: 'events@nadistuti.com',
      icon: Mail,
      color: 'blue'
    },
    {
      id: 'whatsapp',
      title: t('events.contact.whatsapp', currentLang),
      description: t('events.contact.whatsapp_description', currentLang),
      contact: '+91 9340708756',
      icon: MessageCircle,
      color: 'green'
    },
    {
      id: 'volunteer',
      title: t('events.contact.volunteer', currentLang),
      description: t('events.contact.volunteer_description', currentLang),
      contact: t('events.contact.register_now', currentLang),
      icon: Users,
      color: 'purple'
    },
    {
      id: 'sponsor',
      title: t('events.contact.sponsor', currentLang),
      description: t('events.contact.sponsor_description', currentLang),
      contact: t('events.contact.learn_more_sponsor', currentLang),
      icon: DollarSign,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getLinkColor = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 hover:text-blue-700',
      green: 'text-green-600 hover:text-green-700',
      purple: 'text-purple-600 hover:text-purple-700',
      orange: 'text-orange-600 hover:text-orange-700'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('events.contact.title', currentLang)}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('events.contact.subtitle', currentLang)}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div key={option.id} className="text-center">
                <div className={`w-16 h-16 ${getColorClasses(option.color)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                <button 
                  onClick={() => onContactAction(option.id)}
                  className={`font-medium ${getLinkColor(option.color)}`}
                >
                  {option.contact}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;