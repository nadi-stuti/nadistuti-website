import React from 'react';
import { Camera, FileText, Video, Upload } from 'lucide-react';
import { t } from '../../i18n/translations';

interface UserEvent {
  id: string;
  title: string;
  description: string;
  organizer: {
    name: string;
    location: string;
    avatar: string;
  };
  status: string;
  category: string;
}

interface CommunityEventsProps {
  userEvents: UserEvent[];
  onSubmitEvent: () => void;
  onViewEvent: (eventId: string) => void;
  currentLang: string;
}

const CommunityEvents: React.FC<CommunityEventsProps> = ({ 
  userEvents, 
  onSubmitEvent, 
  onViewEvent,
  currentLang 
}) => {
  const getStatusBadge = (status: string) => {
    const badges = {
      completed: 'bg-green-100 text-green-800',
      featured: 'bg-blue-100 text-blue-800',
      trending: 'bg-purple-100 text-purple-800'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getActionText = (status: string) => {
    const actions = {
      completed: t('events.community_events.view_photos', currentLang),
      featured: t('events.community_events.view_story', currentLang),
      trending: t('events.community_events.view_video', currentLang)
    };
    return actions[status as keyof typeof actions] || t('events.community_events.view_details', currentLang);
  };

  const getActionColor = (status: string) => {
    const colors = {
      completed: 'text-green-600 hover:text-green-700',
      featured: 'text-blue-600 hover:text-blue-700',
      trending: 'text-purple-600 hover:text-purple-700'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 hover:text-gray-700';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('events.community_events.title', currentLang)}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('events.community_events.subtitle', currentLang)}
          </p>
        </div>

        {/* Featured User Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('events.community_events.featured_user_events', currentLang)}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userEvents.map((event) => (
              <div 
                key={event.id}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onViewEvent(event.id)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {event.organizer.avatar}
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-gray-900">{event.organizer.name}</div>
                    <div className="text-sm text-gray-600">{event.organizer.location}</div>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(event.status)}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                  <button className={`text-sm font-medium ${getActionColor(event.status)}`}>
                    {getActionText(event.status)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organize Your Event */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">{t('events.community_events.organize_event', currentLang)}</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            {t('events.community_events.organize_description', currentLang)}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Camera className="w-8 h-8 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">{t('events.community_events.step_document', currentLang)}</h4>
              <p className="text-sm text-blue-100">{t('events.community_events.step_document_desc', currentLang)}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Upload className="w-8 h-8 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">{t('events.community_events.step_share', currentLang)}</h4>
              <p className="text-sm text-blue-100">{t('events.community_events.step_share_desc', currentLang)}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <FileText className="w-8 h-8 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">{t('events.community_events.step_featured', currentLang)}</h4>
              <p className="text-sm text-blue-100">{t('events.community_events.step_featured_desc', currentLang)}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onSubmitEvent}
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {t('events.community_events.submit_event', currentLang)}
            </button>
            <button className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors border border-blue-500">
              {t('events.community_events.event_guidelines', currentLang)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityEvents;